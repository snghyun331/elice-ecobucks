import { User, Challenge, ChallengeParticipation } from "../db/index.js";
import { updateTime } from "../utils/update-time.js";
import { setError, handleError } from "../utils/customError.js"
import { validatePermission } from "../utils/validators.js";
class ParticipationService {
  static async createParticipation({ userId, challengeId, image }) {
    try{
      let createdNewParticipation;
      if (!image){ 
        throw setError("이미지가 없습니다.", 400, "BAD_REQUEST")
      }
      const participation = await ChallengeParticipation.findOne({ challengeId });
      const challenge = await Challenge.findById({ _id: challengeId })
      
      // participation가 처음 생성일 때 create
      if (participation == null){
        const createInput = { userId, challengeId, image, hasParticipatedToday: true }
        const createdParticipation = await ChallengeParticipation.create(createInput);
        // 시간을 한국표준시간으로 변경
        createdNewParticipation=updateTime.toTimestamps(createdParticipation);
      }
      // participation 오늘 참여했을때
      else if (participation.hasParticipatedToday == true ){
        // Participation hasParticipatedToday Check
        throw setError("같은 챌린지에는 하루에 한번 참여 할 수 있습니다.", 409, "CONFLICT")
      }
      // participation 오늘 참여 가능할때 false -> true, create
      else {
        participation.hasParticipatedToday = true
        await participation.save();
        const createInput = { userId, challengeId, image, hasParticipatedToday: true }
        const createdParticipation = await ChallengeParticipation.create(createInput);
        createdNewParticipation=updateTime.toTimestamps(createdParticipation);
      }
      if (!createdNewParticipation)  
        throw setError("참여 신청 실패", 500, "CREATE_FAILED")
      //--- Challenge Update ---
      // 신청자수 count 증가, dueDate를 넘을경우 신청x
      const currentDateTime = new Date();
      if (challenge.dueDate.getTime() < currentDateTime.getTime()){
        challenge.isCompleted = true;
        throw setError("참여기간이 종료되었습니다", 409, "CONFLICT")
      }else {
        // challenge에 참여자수 카운트
        challenge.participantsCount += 1; 
      }
      await challenge.save();

      //--- User Update ---
      // 유저정보 갱신 - 참여자 마일리지 1000추가
      const user = await User.findById({ userId });
      user.mileage += 1000;
      await user.save();

      return createdNewParticipation;
    } catch (error) {
      throw handleError(error)
    }
    
  }

  static async findParticipations({ challengeId }) {
    const participations = await ChallengeParticipation.NoAsyncfindAll({ challengeId }).populate('userId', 'username districtCode districtName').exec();
    if (!participations){
      throw setError("참여기록을 찾을 수 없습니다", 404, "NOT_FOUND")
    }
    return participations;
  }

  static async findParticipation({ challengeId, _id }) {
    const participation = await ChallengeParticipation.NoAsyncfindById({ _id }).populate('userId', 'username districtCode districtName').exec();
    if (!participation || participation.challengeId.toString() !== challengeId){ 
      throw setError("참여기록을 찾을 수 없습니다", 404, "NOT_FOUND")
    }
    return updateTime.toTimestamps(participation);
  }

  static async updateParticipation({ _id, currentUserId, image }) {
    try{
      const participation = await ChallengeParticipation.findById({ _id });
      await validatePermission(participation, currentUserId);

      const updateParticipation = await ChallengeParticipation.update({ _id, image })
      
      return updateTime.toTimestamps(updateParticipation);

    } catch (error) {
      throw handleError(error)
    }
    
  }

  static async deleteParticipation(challengeId, _id, currentUserId) {
    try{
      const participation = await ChallengeParticipation.findById({ _id });
      await validatePermission(participation, currentUserId);
    
      // 삭제시 Challenge의 participantsCount 1감소
      const challenge = await Challenge.findById({ _id:challengeId })

      challenge.participantsCount += -1;
      await challenge.save();

      //--- User Update ---
      // 유저정보 갱신 - 참여자 마일리지 1000감소
      const user = await User.findById({ userId: currentUserId });
      user.mileage -= 1000;
      await user.save();

      await ChallengeParticipation.deleteById(_id);
    } catch {
      throw handleError(error)
    }
  }

}
 
export { ParticipationService };

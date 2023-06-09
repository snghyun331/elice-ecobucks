import { User, Challenge, ChallengeParticipation } from "../db/index.js";
import { updateTimestamps } from "../utils/update-time-stamps.js";

class ParticipationService {
  static async createParticipation({ userId, challengeId, image }) {
    let createdNewParticipation;
    if (!image) {
      throw new Error("이미지가 없습니다."); 
    }
    const participation = await ChallengeParticipation.findOne({ challengeId });
    const challenge = await Challenge.findById({ _id: challengeId })
    
    // participation가 처음 생성일 때 create
    if (participation == null){
      const createInput = { userId, challengeId, image, hasParticipatedToday: true }
      const createdParticipation = await ChallengeParticipation.create(createInput);
      // 시간을 한국표준시간으로 변경
      createdNewParticipation=updateTimestamps(createdParticipation);
    }
    // participation 오늘 참여했을때
    else if (participation.hasParticipatedToday == true ){
      // Participation hasParticipatedToday Check
      throw new Error("같은 챌린지에는 하루에 한번 참여 할 수 있습니다 ");
    }
    // participation 오늘 참여 가능할때 false -> true, create
    else {
      participation.hasParticipatedToday = true
      await participation.save();
      const createInput = { userId, challengeId, image, hasParticipatedToday: true }
      const createdParticipation = await ChallengeParticipation.create(createInput);
      createdNewParticipation=updateTimestamps(createdParticipation);
    }
    //--- Challenge Update ---
    // 신청자수 count 증가, dueDate를 넘을경우 신청x
    const currentDateTime = new Date();
    if (challenge.dueDate.getTime() < currentDateTime.getTime()){
      challenge.isCompleted = true;
      throw new Error("참여기간이 종료되었습니다")
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
  }

  static async findChallenges({ challengeId }) {
    const participations = await ChallengeParticipation.NoAsyncfindAll({ challengeId }).populate('userId', 'username districtCode districtName').exec();
    return participations;
  }

  static async findChallenge({ challengeId, _id }) {
    const participation = await ChallengeParticipation.NoAsyncfindById({ _id }).populate('userId', 'username districtCode districtName').exec();
    if (!participation || participation.challengeId.toString() !== challengeId) {
      throw new Error("찾을 수 없습니다.");
    }

    return updateTimestamps(participation);
  }

  static async updateChallenge({ _id, currentUserId, image }) {
    const participation = await ChallengeParticipation.findById({ _id })
    if ( !participation ){ 
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    }
    if( participation.userId.toString() !== currentUserId ){
      throw new Error("수정 권한이 없습니다.");
    }
    const updateParticipation = await ChallengeParticipation.update({ _id, image })
    
    return updateTimestamps(updateParticipation);;
  }

  static async deleteChallenge(challengeId, _id, currentUserId) {
    const participation = await ChallengeParticipation.findById({ _id })
    if(!participation){
      throw new Error("해당 id를 가진 데이터는 없습니다.");
    }
    if(participation.userId.toString() !== currentUserId){
      throw new Error("삭제 권한이 없습니다.");
    }

    // 삭제시 Challenge의 participantsCount 1감소
    const challenge = await Challenge.findById({ _id:challengeId })
    challenge.participantsCount += -1;
    await challenge.save();

    await ChallengeParticipation.deleteById(_id);
    return { status: "ok" };
  }

}
 
export { ParticipationService };

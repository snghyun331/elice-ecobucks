import { ChallengeParticipation } from "../db/models/challenge-participation.js";
import { Challenge } from "../db/models/challenge.js"
import { User } from "../db/models/User.js"
import { updateTimestamps } from "../utils/update-time-stamps.js";
class ParticipationService {
  static async createParticipation({ userId, challengeId, image }) {
    if (!image) {
      throw new Error("이미지가 없습니다."); 
    }
    //--- Participation hasParticipatedToday Check ---
    // const participation = await ChallengeParticipation.findById({ _id:challengeId })
    // if (participation.hasParticipatedToday === true ){
    //   throw new Error("같은 챌린지에는 하루에 한번 참여 할 수 있습니다 "); 
    // }

    //--- Challenge Update ---
    // 신청자수 count 증가, user의 마일리지 1000추가
    const challenge = await Challenge.findById({ _id:challengeId })
    // dueDate(마감기한)를 넘을경우 신청x
    const currentDateTime = new Date();
    if (challenge.dueDate.getTime() < currentDateTime.getTime()){
      challenge.isCompleted = true;
      throw new Error("참여기간이 종료되었습니다")
    }
    // 참여자수 카운트      
    else {
      challenge.participantsCount += 1; 
    }
    await challenge.save();
    
    //--- User Update ---
    // 유저정보 갱신 - 참여자 마일리지 추가
    const user = await User.findById({ userId: challenge.userId })
    user.mileage += 1000;
    await user.save();

    //--- Participation Create ---
    // 참가 신청 생성
    const createParticipation = { userId, challengeId, image, title: challenge.title, hasParticipatedToday: true }
    const createdParticipation = await ChallengeParticipation.create(createParticipation);
    // 시간을 한국표준시간으로 변경
    const updateCreatedParticipation=updateTimestamps(createdParticipation)

    return updateCreatedParticipation;
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
    const findIdParticipation = await ChallengeParticipation.findById({ _id })
    if ( !findIdParticipation ){ 
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    }
    if( findIdParticipation.userId.toString() !== currentUserId ){
      throw new Error("수정 권한이 없습니다.");
    }
    const updatedParticipation = await ChallengeParticipation.update({ _id, image })
    
    return updateTimestamps(updatedParticipation);;
  }

  static async deleteChallenge(challengeId, _id, currentUserId) {
    const findIdParticipation = await ChallengeParticipation.findById({ _id })
    if(findIdParticipation.userId.toString() !== currentUserId){
      throw new Error("삭제 권한이 없습니다.");
    }

    // 삭제시 Challenge의 participantsCount 1감소
    const findchallenge = await Challenge.findById({ _id:challengeId })
    findchallenge.participantsCount += -1;
    await findchallenge.save();

    await ChallengeParticipation.deleteById(_id);
    return { status: "ok" };
  }

}
 
export { ParticipationService };

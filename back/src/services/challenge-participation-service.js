import { Participation } from "../db/models/challenge-participation.js";
import { Challenge } from "../db/models/challenge.js"
import { User } from "../db/models/User.js"
import { updateTime } from "../utils/updateTime.js";
class ParticipationService {
  static async createParticipation({ userId, challenge_id, image }) {
    if (!image) 
      throw new Error("이미지가 없습니다."); 
    
    // Challenge Update
    // 신청자수 count 증가, user의 마일리지 1000추가
    const challenge = await Challenge.findById({ _id:challenge_id })
    // dueDate(마감기한)를 넘을경우 신청x
    const currentDateTime = new Date();
    if (challenge.dueDate.getTime() < currentDateTime.getTime()){
      challenge.isCompleted = true;
      throw new Error("참여기간이 종료되었습니다")
    }
    // 참여자수 카운트      
    else challenge.participantsCount += 1;
    await challenge.save();
    
    // User Update
    // 유저정보 갱신 - 참여자 마일리지 추가
    const user = await User.findById({ userId: challenge.userId })
    user.mileage += 1000;
    await user.save();

    // Participation Create
    // 참가 신청 생성
    const createdParticipation = await Participation.create({ userId, challenge_id, image });
    // 시간을 한국표준시간으로 변경
    const updateCreatedParticipation = {
      ...createdParticipation._doc,
      dueDate : updateTime.toKST(createdParticipation.dueDate),
      createdAt: updateTime.toKST(createdParticipation.createdAt),
      updatedAt: updateTime.toKST(createdParticipation.updatedAt),
    }

    return updateCreatedParticipation;
  }

  static async findChallenges({ challenge_id }) {
    const challenges = await Participation.NoAsyncfindAll({ challenge_id }).populate('userId', 'username guCode guName mileage').exec();

    return challenges;
  }

  static async findChallenge({ challenge_id, _id }) {
    const challenge = await Participation.NoAsyncfindById({ _id }).populate('userId', 'username guCode guName mileage').exec();
    if (!challenge || challenge.challenge_id.toString() !== challenge_id) {
      throw new Error("찾을 수 없습니다.");
    }

    return challenge;
  }

  static async updateChallenge({ _id, currentUserId, image }) {
    const findIdParticipation = await Participation.findById({ _id })
    if ( !findIdParticipation ) 
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    
    if( findIdParticipation.userId.toString() !== currentUserId )
      throw new Error("수정 권한이 없습니다.");
    
    
    const updatedChallenge = await Participation.update({ _id, image })
    
    return updatedChallenge;
  }

  static async deleteChallenge(challenge_id, _id, currentUserId) {
    const findIdParticipation = await Participation.findById({ _id })
    if(findIdParticipation.userId.toString() !== currentUserId)
      throw new Error("삭제 권한이 없습니다.");
    //const challenge_id = findIdParticipation.challenge_id.toString()
    //await challengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: -1 } });

    // 삭제시 Challenge의 participantsCount 1감소
    const findchallenge = await Challenge.findById({ _id:challenge_id })
    findchallenge.participantsCount += -1;
    await findchallenge.save();

    await Participation.deleteById(_id);
    return { status: "ok" };
  }

}
 
export { ParticipationService };

import { Participation } from "../db/models/challenge-participation.js";
import { challengeModel } from "../db/schemas/challenge.js";
class ParticipationService {
  static async createParticipation({ userId, challenge_id, image }) {

    const createdChallenge = await Participation.create({ userId, challenge_id, image });
    // Challenge의 participantsCount 1 증가
    await challengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: 1 } });
    return createdChallenge;
  }

  static async findChallenges({ challenge_id }) {
    const challenges = await Participation.NoAsyncfindAll({ challenge_id }).populate('userId', 'username districtCode districtName').exec();

    return challenges;
  }

  static async findChallenge({ challenge_id, _id }) {
    const challenge = await Participation.NoAsyncfindById({ _id }).populate('userId', 'username districtCode districtName').exec();
    if (!challenge || challenge.challenge_id.toString() !== challenge_id) {
      throw new Error("찾을 수 없습니다.");
    }

    return challenge;
  }

  static async updateChallenge({ _id, currentUserId, image }) {
    const findIdParticipation = await Participation.findById({ _id })
    if ( !findIdParticipation ) {
      throw new Error("해당 id를 가진 데이터는 없습니다.")
    }
    if( findIdParticipation.userId.toString() !== currentUserId ){
      throw new Error("수정 권한이 없습니다.");
    }
    
    const updatedChallenge = await Participation.update({ _id, image })
    
    return updatedChallenge;
  }

  static async deleteChallenge(_id, currentUserId) {
    const findIdParticipation = await Participation.findById({ _id })
    if(findIdParticipation.userId.toString() !== currentUserId)
      throw new Error("삭제 권한이 없습니다.");
    const challenge_id = findIdParticipation.challenge_id.toString()
    await challengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: -1 } });

    await Participation.deleteById(_id);
    return { status: "ok" };
  }

}
 
export { ParticipationService };

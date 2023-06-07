<<<<<<< HEAD
import { ChallengeParticipation } from "../db/models/challenge-participation.js";
import { ChallengeModel } from "../db/schemas/challenge.js";
class challengeParticipationService {
  static async createChallengeParticipation({ userId, challenge_id, image }) {

    const createdChallenge = await ChallengeParticipation.create({ userId, challenge_id, image });
=======
import { Participation } from "../db/models/challenge-participation.js";
import { challengeModel } from "../db/schemas/challenge.js";
class ParticipationService {
  static async createParticipation({ user_id, challenge_id, image }) {

    const createdChallenge = await Participation.create({ user_id, challenge_id, image });
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db
    // Challenge의 participantsCount 1 증가
    await challengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: 1 } });
    return createdChallenge;
  }

  static async findChallenges({ challenge_id }) {
<<<<<<< HEAD
    const challenges = await ChallengeParticipation.NoAsyncfindAll({ challenge_id }).populate('userId', 'guCode guName').exec();
=======
    const challenges = await Participation.NoAsyncfindAll({ challenge_id }).populate('user_id', 'username guCode guName').exec();
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db

    return challenges;
  }

  static async findChallenge({ challenge_id, _id }) {
<<<<<<< HEAD
    const challenge = await ChallengeParticipation.NoAsyncfindById({ _id }).populate('userId', 'guCode guName').exec();
=======
    const challenge = await Participation.NoAsyncfindById({ _id }).populate('user_id', 'username guCode guName').exec();
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db
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
<<<<<<< HEAD
    if( findIdParticipation.userId.toString() !== currentUserId )
=======
    if( findIdParticipation.user_id.toString() !== currentUserId ){
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db
      throw new Error("수정 권한이 없습니다.");
    }
    
    const updatedChallenge = await Participation.update({ _id, image })
    
    return updatedChallenge;
  }

  static async deleteChallenge(_id, currentUserId) {
<<<<<<< HEAD
    const findIdParticipation = await ChallengeParticipation.findById({ _id })
    if(findIdParticipation.userId.toString() !== currentUserId)
=======
    const findIdParticipation = await Participation.findById({ _id })
    if(findIdParticipation.user_id.toString() !== currentUserId)
>>>>>>> 8c5162323d2d38d1cccc9c74b35f6a3ac34f65db
      throw new Error("삭제 권한이 없습니다.");
    const challenge_id = findIdParticipation.challenge_id.toString()
    await challengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: -1 } });

    await Participation.deleteById(_id);
    return { status: "ok" };
  }

}
 
export { ParticipationService };

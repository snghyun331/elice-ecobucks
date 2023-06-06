import { ChallengeParticipation } from "../db/models/challenge-participation.js";
import { ChallengeModel } from "../db/schemas/challenge.js";
class ChallengeParticipationService {
  static async createChallengeParticipation({ user_id, challenge_id, imageURL }) {

    const createdChallenge = await ChallengeParticipation.create({ user_id, challenge_id, imageURL });
    // Challenge의 participantsCount 1 증가
    await ChallengeModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: 1 } });
    return createdChallenge;
  }
}
 
export { ChallengeParticipationService };

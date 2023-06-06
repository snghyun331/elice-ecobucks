import { ChallengeParticipation } from "../db/models/challengeParticipation.js";
import { ChallengeCommentModel } from "../db/schemas/challengeComment.js";

class ChallengeParticipationService {
  static async createChallengeParticipation({ user_id, challenge_id, imageURL }) {

    const createdChallenge = await ChallengeParticipation.create({ user_id, challenge_id, imageURL });
    await ChallengeCommentModel.updateOne({ _id: challenge_id }, { $inc: { participantsCount: 1 } });
    return createdChallenge;
  }
}

export { ChallengeParticipationService };

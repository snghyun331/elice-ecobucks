import { Comment } from "../db/models/challenge-comment.js";
import { challengeModel } from "../db/schemas/challenge.js";
class CommentService {
  static async createComment({ userId, challenge_id, content }) {
    const createdChallenge = await Comment.create({
      userId,
      challenge_id,
      content,
    });
    // Challenge의 participantsCount 1 증가
    await challengeModel.updateOne(
      { _id: challenge_id },
      { $inc: { commentsCount: 1 } }
    );
    return createdChallenge;
  }

  static async findComments({ challenge_id }) {
    const challenges = await Comment.NoAsyncfindAll({ challenge_id })
      .populate("userId", "username districtCode districtName")
      .exec();

    return challenges;
  }

  static async findComment({ challenge_id, _id }) {
    const challenge = await Comment.NoAsyncfindById({ _id })
      .populate("userId", "username districtCode districtName")
      .exec();
    if (!challenge || challenge.challenge_id.toString() !== challenge_id) {
      throw new Error("찾을 수 없습니다.");
    }

    return challenge;
  }

  static async updateComment({ _id, currentUserId, content }) {
    const findIdComment = await Comment.findById({ _id });
    if (!findIdComment) {
      throw new Error("해당 id를 가진 데이터는 없습니다.");
    }
    if (findIdComment.userId.toString() !== currentUserId) {
      throw new Error("수정 권한이 없습니다.");
    }

    const updatedChallenge = await Comment.update({ _id, content });

    return updatedChallenge;
  }

  static async deleteComment(_id, currentUserId) {
    const findIdComment = await Comment.findById({ _id });
    if (findIdComment.userId.toString() !== currentUserId)
      throw new Error("삭제 권한이 없습니다.");
    const challenge_id = findIdComment.challenge_id.toString();
    await challengeModel.updateOne(
      { _id: challenge_id },
      { $inc: { commentsCount: -1 } }
    );

    await Comment.deleteById(_id);
    return { status: "ok" };
  }
}

export { CommentService };

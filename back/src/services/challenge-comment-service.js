import { ChallengeComment, Challenge } from "../db/index.js";
import { challengeModel } from "../db/schemas/challenge.js";
import { updateTime } from "../utils/update-time.js";
import { setError, handleError } from "../utils/customError.js"
import { checkData, checkAuthor, validatePermission } from "../utils/validators.js";
class CommentService {
  static async createComment({ userId, challengeId, content }) {
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
    else challenge.commentsCount += 1;
    await challenge.save();
    
    //--- Comment Create ---
    const createdChallenge = await ChallengeComment.create({ userId, challengeId, content });
    if (!createdChallenge)  
      throw setError("댓글 생성 실패", 500, "CREATE_FAILED")
    if (!content){ 
      throw setError("댓글을 찾을 수 없습니다.", 404, "NOT_FOUND")
    }
    // 한국표준시로 변경
    const createdNewChallenge=updateTime.toTimestamps(createdChallenge)  

    return createdNewChallenge;
  }

  static async findComments({ challengeId }) {
    const comments = await ChallengeComment.NoAsyncfindAll({ challengeId })
      .populate("userId", "username districtCode districtName")
      .exec();
    if (!comments) {
      throw setError("댓글을 찾을 수 없습니다.", 404, "NOT_FOUND")
    }

    return comments;
  }

  static async findComment({ challengeId, _id }) {
    const comment = await ChallengeComment.NoAsyncfindById({ _id })
      .populate("userId", "username districtCode districtName")
      .exec();
    if (!comment || comment.challengeId.toString() !== challengeId) {
      throw setError("댓글을 찾을 수 없습니다.", 404, "NOT_FOUND")
    }

    return updateTime.toTimestamps(comment);
  }

  static async updateComment({ _id, currentUserId, content }) {
    const findIdComment = await ChallengeComment.findById({ _id });
    await validatePermission(findIdComment, currentUserId);
    
    const updateComment = await ChallengeComment.update({ _id, content });

    return updateTime.toTimestamps(updateComment);
  }

  static async deleteComment(_id, currentUserId) {
    const findIdComment = await ChallengeComment.findById({ _id });
    await validatePermission(findIdComment, currentUserId);

    const challengeId = findIdComment.challengeId.toString();
    await challengeModel.updateOne(
      { _id: challengeId },
      { $inc: { commentsCount: -1 } }
    );

    await ChallengeComment.deleteById(_id);
  }
}

export { CommentService };

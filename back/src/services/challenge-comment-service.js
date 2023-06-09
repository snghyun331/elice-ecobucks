import { ChallengeComment } from "../db/models/challenge-comment.js";
import { Challenge } from "../db/models/challenge.js";
import { challengeModel } from "../db/schemas/challenge.js";
import { updateTimestamps } from "../utils/update-time-stamps.js";
class CommentService {
  static async createComment({ userId, challenge_id, content }) {
    if (!content){ 
      throw new Error("댓글 내용이 없습니다.");  
    }
    //--- Challenge Update ---
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
    
    //--- Comment Create ---
    const createdComment = await ChallengeComment.create({ userId, challenge_id, content });
    // 시간을 한국표준시간으로 변경
    const updateCreatedChallenge=updateTimestamps(createdComment)  

    return updateCreatedChallenge;
  }

  static async findComments({ challenge_id }) {
    const comments = await ChallengeComment.NoAsyncfindAll({ challenge_id })
      .populate("userId", "username districtCode districtName")
      .exec();

    return comments;
  }

  static async findComment({ challenge_id, _id }) {
    const comment = await ChallengeComment.NoAsyncfindById({ _id })
      .populate("userId", "username districtCode districtName")
      .exec();
    if (!comment || comment.challenge_id.toString() !== challenge_id) {
      throw new Error("찾을 수 없습니다.");
    }

    return updateTimestamps(comment);
  }

  static async updateComment({ _id, currentUserId, content }) {
    const findIdComment = await ChallengeComment.findById({ _id });
    if (!findIdComment) {
      throw new Error("해당 id를 가진 데이터는 없습니다.");
    }
    if (findIdComment.userId.toString() !== currentUserId) {
      throw new Error("수정 권한이 없습니다.");
    }

    const updatedComment = await ChallengeComment.update({ _id, content });

    return updateTimestamps(updatedComment);
  }

  static async deleteComment(_id, currentUserId) {
    const findIdComment = await ChallengeComment.findById({ _id });
    if (findIdComment.userId.toString() !== currentUserId){
      throw new Error("삭제 권한이 없습니다.");
    }
    const challenge_id = findIdComment.challenge_id.toString();
    await challengeModel.updateOne(
      { _id: challenge_id },
      { $inc: { commentsCount: -1 } }
    );

    await ChallengeComment.deleteById(_id);
    return { status: "ok" };
  }
}

export { CommentService };

import { User, BlogComment } from "../db/index.js";


class blogCommentService {
    static async addComment({ post_id, writer_id, comment }) {
        if (!comment) {
            const errorMessage = "댓글을 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findByWriterId({writer_id})
        
        const writername = user.username
        const newComment = { post_id, writer_id, writername, comment };
        const createdNewComment = await BlogComment.createComment({newComment})
        createdNewComment.errorMessage = null

        return createdNewComment
    }


    static async setComment({ comment_id, toUpdate }) {
        let comment = await BlogComment.findOneById({ comment_id });
        
        if (!comment) {
            const errorMessage =
                "해당 댓글을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        if (toUpdate.comment) {
            const fieldToUpdate = "comment";
            const newValue = toUpdate.comment;
            comment = await BlogComment.update({ comment_id, fieldToUpdate, newValue });
        }

        comment.errorMessage = null;
        return comment;
    }


    static async deleteComment({ comment_id }) {
        let isDeleted = await BlogComment.deleteOneById({ comment_id });
        if (!isDeleted) {
            const errorMessage = "삭제할 댓글 정보가 없습니다.";
            return { errorMessage };
        }
        return { result: "Success" };
    }   

    static async findComments({ blogId }) {
        const comments = await BlogComment.NoAsyncfindAll({ challengeId })
          .populate("userId", "username districtCode districtName")
          .exec();
        if (!comments) {
          throw setError("댓글을 찾을 수 없습니다.", 404, "NOT_FOUND")
        }
    
        return comments;
      }

    static async findAllComments() {
        const comments = await BlogComment.findAll();
        console.log(comments);
        return comments;
    }
}

export { blogCommentService };

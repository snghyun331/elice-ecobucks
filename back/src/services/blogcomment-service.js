import { User, BlogComment } from "../db/index.js";


class blogCommentService {
    static async addComment({ postId, writerId, comment }) {
        if (!comment) {
            const errorMessage = "댓글을 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findByWriterId({ writerId })
        
        const writerName = user.userName
        const newComment = { postId, writerId, writerName, comment };
        const createdNewComment = await BlogComment.createComment({ newComment })
        createdNewComment.errorMessage = null

        return createdNewComment
    }


    static async setComment({ commentId, toUpdate }) {
        let comment = await BlogComment.findOneById({ commentId });
        
        if (!comment) {
            const errorMessage =
                "해당 댓글을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        if (toUpdate.comment) {
            const fieldToUpdate = "comment";
            const newValue = toUpdate.comment;
            comment = await BlogComment.update({ commentId, fieldToUpdate, newValue });
        }

        comment.errorMessage = null;
        return comment;
    }


    static async deleteComment({ commentId }) {
        let isDeleted = await BlogComment.deleteOneById({ commentId });
        if (!isDeleted) {
            const errorMessage = "삭제할 댓글 정보가 없습니다.";
            return { errorMessage };
        }
        return { result: "Success" };
    }   

    static async findComments({ blogId }) {
        const comments = await BlogComment.NoAsyncfindAll({ challengeId })
            .populate("userId", "userName districtCode districtName")
            .exec();
        if (!comments) {
            throw setError("댓글을 찾을 수 없습니다.", 404, "NOT_FOUND")
        }
    
        return comments;
    }

    static async findAllComments() {
        const comments = await BlogComment.findAll();
        return comments;
    }
}

export { blogCommentService };

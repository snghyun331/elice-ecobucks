import { User, BlogComment } from "../db/index.js";


class blogCommentService {
    static async addComment({ post_id, writer_id, comment }) {
        if (!comment) {
            const errorMessage = "댓글을 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findByWriterId({writer_id})
        
        const username = user.username
        const newComment = { post_id, writer_id, username, comment };
        const createdNewComment = await BlogComment.createComment({newComment})
        createdNewComment.errorMessage = null

        return createdNewComment
    }



} 



export { blogCommentService };

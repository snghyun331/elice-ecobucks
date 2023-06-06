import { BlogCommentModel } from "../schemas/blogComment.js";

class BlogComment {
    static async createComment({ newComment }) {
        const createdNewComment = await BlogCommentModel.create(newComment);
        return createdNewComment;
    }
}

export { BlogComment };

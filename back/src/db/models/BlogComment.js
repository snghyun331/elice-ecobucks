import { BlogCommentModel } from "../schemas/blogComment.js";

class BlogComment {
    static async createComment({ newComment }) {
        const createdNewComment = await BlogCommentModel.create(newComment);
        return createdNewComment;
    }

    static async findOneById({ comment_id }) {
        const comment = await BlogCommentModel.findOne({ _id: comment_id });
        return comment
    }

    static async update({ comment_id, fieldToUpdate, newValue }) {
        const filter = { _id: comment_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
    
        const updatedcomment = await BlogCommentModel.findOneAndUpdate(
            filter, update, option
        );
        return updatedcomment;
    }
}

export { BlogComment };

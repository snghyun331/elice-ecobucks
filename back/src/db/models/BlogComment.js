import { BlogCommentModel } from "../schemas/blogcomment.js";

class BlogComment {
    static async createComment({ newComment }) {
        const createdNewComment = await BlogCommentModel.create(newComment);
        return createdNewComment;
    }

    static async findOneById({ comment_id }) {
        const comment = await BlogCommentModel.findOne({ _id: comment_id });
        return comment
    }

    static async findAllByPostId({ post_id }){
        const PostComments = await BlogCommentModel.find({ post_id : post_id });;
        return PostComments
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

    static async deleteOneById({ comment_id }) {
        const deletedComment = await BlogCommentModel.deleteOne({ _id: comment_id });
        const isCompleteDeleted = deletedComment.deletedCount === 1;
        return isCompleteDeleted;
    }

    static async findAll() {
        const comments = await BlogCommentModel.find();
        return comments;
    }
}

export { BlogComment };

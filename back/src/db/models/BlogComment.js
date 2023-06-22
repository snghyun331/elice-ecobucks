import { BlogCommentModel } from "../schemas/blogcomment.js";

class BlogComment {
    static async createComment({ newComment }) {
        const createdNewComment = await BlogCommentModel.create(newComment);
        return createdNewComment;
    }

    static async findOneById({ commentId }) {
        const comment = await BlogCommentModel.findOne({ _id: commentId });
        return comment
    }

    static async findAllByPostId({ postId }){
        const PostComments = await BlogCommentModel.find({ postId : postId });;
        return PostComments
    }
    
    static async update({ commentId, fieldToUpdate, newValue }) {
        const filter = { _id: commentId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
    
        const updatedcomment = await BlogCommentModel.findOneAndUpdate(
            filter, update, option
        );
        return updatedcomment;
    }

    static async deleteOneById({ commentId }) {
        const deletedComment = await BlogCommentModel.deleteOne({ _id: commentId });
        const isCompleteDeleted = deletedComment.deletedCount === 1;
        return isCompleteDeleted;
    }

    static async findAll() {
        const comments = await BlogCommentModel.find();
        return comments;
    }
}

export { BlogComment };

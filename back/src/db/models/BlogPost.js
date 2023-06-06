import { BlogPostModel } from "../schemas/blogPost.js";

class BlogPost {
    static async createPost({ newPost }) {
        const createdNewPost = await BlogPostModel.create(newPost);
        return createdNewPost;
    }

    static async findOneById({ post_id }) {
        const post = await BlogPostModel.findOne({ _id: post_id });
        return post
    }

    static async findAllPosts() {
        const posts = await BlogPostModel.find({});
        return posts;
    }

    static async update({ post_id, fieldToUpdate, newValue }) {
        const filter = { _id: post_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
    
        const updatedpost = await BlogPostModel.findOneAndUpdate(
            filter, update, option
        );
        return updatedpost;
    }

    static async deleteOneById({ post_id }) {
        const deletedPost = await BlogPostModel.deleteOne({ _id: post_id });
        const isCompleteDeleted = deletedPost.deletedCount === 1;
        return isCompleteDeleted;
    }

    static async addLike({ post_id, pressLikeUserId }) {
        const filter = { _id: post_id };
        const update = {
            $inc: { likeCount: 1 },
            $addToSet: { likeUsers: pressLikeUserId },
        };
        const option = { returnOriginal: false };
    
        const AddLike = await BlogPostModel.findOneAndUpdate(
            filter, update, option
        );

        return AddLike;
    }


    static async deleteLike({ post_id, cancelLikeUserId }) {
        const filter = { _id: post_id, likeCount: { $gt: 0 } };  // likeCount가 0보다 큰 경우에만 업데이트
        const update = {
            $inc: { likeCount: -1 },
            $pull: { likeUsers: cancelLikeUserId },
        };
        const option = { returnOriginal: false };
    
        const DeleteLike = await BlogPostModel.findOneAndUpdate(filter, update, option);
        return DeleteLike;
    }


    // static async createComment( { post_id, newComment } ) {
    //     const filter = { _id: post_id }
    //     const update = {
    //         $push: { comments: newComment }
    //     }
    //     const option = { returnOriginal: false };
    //     const AddComment = await BlogPostModel.findOneAndUpdate(filter, update, option);
    //     return AddComment;
    // }
    
    
}

export { BlogPost };

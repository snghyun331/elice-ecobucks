import { BlogPostModel } from "../schemas/blogpost.js";

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

    static async findAllByTopic({ topic }){
        const posts = await BlogPostModel.find({ topic : topic });;
        return posts
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
        const filter = { _id: post_id, likeUsers: { $ne: pressLikeUserId }};
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
        const filter = { _id: post_id, likeCount: { $gt: 0 }, likeUsers: cancelLikeUserId };  // likeCount가 0보다 크고 likeUsers에 cancelLikeUserId가 있는 경우에만 업데이트
        const update = {
            $inc: { likeCount: -1 },
            $pull: { likeUsers: cancelLikeUserId },
        };
        const option = { returnOriginal: false };
    
        const DeleteLike = await BlogPostModel.findOneAndUpdate(filter, update, option);
        return DeleteLike;
    }

    static async findAndCountAll(skip, limit) {
        const posts = await BlogPostModel.find({})
            .sort({likeCount: -1})
            .skip(skip)
            .limit(limit)
            .exec();
        
        const count = await BlogPostModel.countDocuments();
        return { posts, count }
      }
}

export { BlogPost };

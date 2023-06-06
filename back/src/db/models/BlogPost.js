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

}

export { BlogPost };

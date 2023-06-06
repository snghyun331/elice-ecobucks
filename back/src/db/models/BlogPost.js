import { BlogPostModel } from "../schemas/blogPost.js";

class BlogPost {
    static async createPost({ newPost }) {
        const createdNewPost = await BlogPostModel.create(newPost);
        return createdNewPost;
    }

    

    static async findAllPosts() {
        const posts = await BlogPostModel.find({});
        return posts;
    }

}

export { BlogPost };

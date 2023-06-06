import { User, BlogPost } from "../db/index.js";


class blogPostService {
    static async addPost({ user_id, title, topic, content }) {
        if (!title || !topic || !content) {
            const errorMessage = "제목, 주제, 내용 모두 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findById({user_id})
        const username = user.username
        const newPost = { user_id, username, title, topic, content };
        const createdNewPost = await BlogPost.createPost({newPost})
        createdNewPost.errorMessage = null

        return createdNewPost
    }

} 



export { blogPostService };

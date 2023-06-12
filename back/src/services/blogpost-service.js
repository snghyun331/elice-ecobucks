import { User, BlogPost, BlogComment } from "../db/index.js";


class blogPostService {
    static async addPost({ userId, title, topic, content }) {
        if (!title || !topic || !content) {
            const errorMessage = "제목, 주제, 내용 모두 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findById({userId})
        
        const username = user.username
        const newPost = { userId, username, title, topic, content };
        const createdNewPost = await BlogPost.createPost({newPost})
        createdNewPost.errorMessage = null

        return createdNewPost
    }

    static async getPosts() {
        const posts = await BlogPost.findAllPosts();
        return posts
    }


    static async setPost({ post_id, toUpdate }) {
        let post = await BlogPost.findOneById({ post_id });
        
        if (!post) {
            const errorMessage =
                "해당 게시글을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            post = await BlogPost.update({ post_id, fieldToUpdate, newValue });
        }
    
        if (toUpdate.topic) {
            const fieldToUpdate = "topic";
            const newValue = toUpdate.topic;
            post = await BlogPost.update({ post_id, fieldToUpdate, newValue });
        }
        
        if (toUpdate.content) {
            const fieldToUpdate = "content";
            const newValue = toUpdate.content;
            post = await BlogPost.update({ post_id, fieldToUpdate, newValue });
        }

        post.errorMessage = null;
        return post;
    }


    static async deletePost({ post_id }) {
        let isDeleted = await BlogPost.deleteOneById({ post_id });
        if (!isDeleted) {
            const errorMessage = "삭제할 게시글 정보가 없습니다.";
            return { errorMessage };
        }
        return { result: "Success" };
    }


    static async addLike({ post_id, pressLikeUserId }) {
        const likeInfo = await BlogPost.findOneById({ post_id });
        if (!likeInfo) {
            const errorMessage =
                "해당 id의 게시글은 존재하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const AddLike = await BlogPost.addLike({ post_id, pressLikeUserId });
        
        return AddLike;
    } 


    static async deleteLike({ post_id, cancelLikeUserId }) {
        const likeInfo = await BlogPost.findOneById({ post_id });
        if (!likeInfo) {
            const errorMessage =
                "해당 id의 게시글은 존재하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
    
        const DeleteLike = await BlogPost.deleteLike({ post_id, cancelLikeUserId });
        return DeleteLike;
    }


    static async getPostsDetail({post_id}) {
        const post  = await BlogPost.findOneById({post_id});
        const comments = await BlogComment.findAllByPostId({ post_id });

        const info = {
            ...post._doc,
            commentList: comments,
        }
        return info
    }


    static async getFilteredPosts(topic) {
        const posts = await BlogPost.findAllByTopic(topic)
        return posts
    }
}

export { blogPostService };

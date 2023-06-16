import { User, BlogPost, BlogComment } from "../db/index.js";


class blogPostService {
    static async addPost({ userId, title, topic, content }) {
        if (!title || !topic || !content) {
            const errorMessage = "제목, 주제, 내용 모두 입력해주세요";
            return { errorMessage };
        }
        const user = await User.findById({ userId })
        
        const username = user.username
        const newPost = { userId, username, title, topic, content };
        const createdNewPost = await BlogPost.createPost({ newPost })
        createdNewPost.errorMessage = null

        return createdNewPost
    }

    static async getPosts(page) {
        const limit = 6;
        const skip = (page - 1) * limit;
        const { posts, count } = await BlogPost.findAndCountAll(skip, limit);
        const totalPage = Math.ceil(count / limit)
        return { posts, totalPage }
    }


    static async setPost({ postId, toUpdate }) {
        let post = await BlogPost.findOneById({ postId });
        
        if (!post) {
            const errorMessage =
                "해당 게시글을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            post = await BlogPost.update({ postId, fieldToUpdate, newValue });
        }
    
        if (toUpdate.topic) {
            const fieldToUpdate = "topic";
            const newValue = toUpdate.topic;
            post = await BlogPost.update({ postId, fieldToUpdate, newValue });
        }
        
        if (toUpdate.content) {
            const fieldToUpdate = "content";
            const newValue = toUpdate.content;
            post = await BlogPost.update({ postId, fieldToUpdate, newValue });
        }

        post.errorMessage = null;
        return post;
    }


    static async deletePost({ postId }) {
        let isDeleted = await BlogPost.deleteOneById({ postId });
        if (!isDeleted) {
            const errorMessage = "삭제할 게시글 정보가 없습니다.";
            return { errorMessage };
        }
        return { result: "Success" };
    }


    static async addLike({ postId, pressLikeUserId }) {
        const likeInfo = await BlogPost.findOneById({ postId });
        
        if (!likeInfo) {
            const errorMessage = "해당 id의 게시글은 존재하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const AddLike = await BlogPost.addLike({ postId, pressLikeUserId });
        if (!AddLike) {
            const errorMessage = "좋아요를 이미 눌렀습니다.";
            return { errorMessage };
        }
        return AddLike;
    } 


    static async deleteLike({ postId, cancelLikeUserId }) {
        const likeInfo = await BlogPost.findOneById({ postId });
        if (!likeInfo) {
            const errorMessage = "해당 id의 게시글은 존재하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
    
        const DeleteLike = await BlogPost.deleteLike({ postId, cancelLikeUserId });
        if (!DeleteLike) {
            const errorMessage = "좋아요를 이미 취소했습니다.";
            return { errorMessage };
        }
        return DeleteLike;
    }


    static async getPostsDetail({ postId }) {
        const post  = await BlogPost.findOneById({ postId });
        const comments = await BlogComment.findAllByPostId({ postId });

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

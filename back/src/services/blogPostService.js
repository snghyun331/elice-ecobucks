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


    static async setPost({ post_id, toUpdate }) {
        let post = await BlogPost.findOneById({ post_id });
        
        if (!post) {
            const errorMessage =
                "해당 게시글을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        // 업데이트 대상에 title이 있다면, 즉 title 값이 null 이 아니라면 업데이트 진행
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
                "해당 id의 사용자는 존재하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const AddLike = await BlogPost.addLike({ post_id, pressLikeUserId });
        
        return AddLike;
    } 

}

export { blogPostService };

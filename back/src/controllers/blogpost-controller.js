import { blogPostService } from "../services/blogpost-service.js";
import is from '@sindresorhus/is';
import { OK, CREATED } from "../utils/constants.js";

const blogpostPostWrite = async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
    
        const { title, topic, content } = req.body;

        const userId = req.currentUserId;
        const newPost = await blogPostService.addPost({
            userId,title,topic, content
        });
        
        return res.status(CREATED).json(newPost);
    } catch (error) {
        next(error);
    }
};  


const blogpostPutWrite = async function(req, res, next) {
    try{
        const { post_id, title, topic, content } = req.body;
        const toUpdate = { title, topic, content };
        const updatedPost = await blogPostService.setPost({
            post_id,
            toUpdate,
        });

        if (updatedPost.errorMessage) {
            throw new Error(updatedPost.errorMessage);
        }

        return res.status(OK).json(updatedPost);

    } catch (error) {
        next(error);
    }
}


const blogpostDeleteWrite = async function(req, res, next) {
    try{
        const { post_id } = req.body;
        const result = await blogPostService.deletePost({ post_id });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        return res.status(OK).send(result);

    } catch(error) {
        next(error);
    }
}


const blogpostPutLikes = async function(req, res, next) {
    try{
        const post_id = req.params._id
        const { pressLikeUserId } = req.body;
        
        const AddLike = await blogPostService.addLike({
            post_id,
            pressLikeUserId,
        });

        if (AddLike.errorMessage) {
            throw new Error(AddLike.errorMessage);
        }

        return res.status(OK).json(AddLike)
    } catch(error) {
        next(error);
    }
}


const blogpostPutDislikes = async function(req, res, next) {
    try{
        const post_id = req.params._id;
        const { cancelLikeUserId } = req.body;
        const DeleteLike = await blogPostService.deleteLike({
            post_id,
            cancelLikeUserId,
        });

        if (DeleteLike.errorMessage) {
            throw new Error(DeleteLike.errorMessage);
        }

        return res.status(OK).json(DeleteLike);
    } catch(error) {

    }
}

const blogpostGetAll = async function(req, res, next) {
    let posts;
    try{
        if(req.query.topic) {
            const topic = req.query.topic
            posts = await blogPostService.getFilteredPosts({topic});
            res.status(OK).send(posts);
        }
        else {
            posts = await blogPostService.getPosts();   
            res.status(OK).send(posts);
        }
    } catch(error) {
        next(error)
    }
}


const blogpostGetDetail = async function(req, res, next) {
    try{
        const post_id = req.params._id;
        const postInfo = await blogPostService.getPostsDetail({post_id})

        if (postInfo.errorMessage) {
            throw new Error(postInfo.errorMessage);
        }
        return res.status(OK).send(postInfo);
    } catch(error) {
        next(error)
    }
}

export {blogpostPostWrite, blogpostPutWrite, blogpostDeleteWrite,
    blogpostPutLikes,blogpostPutDislikes, blogpostGetAll, blogpostGetDetail};
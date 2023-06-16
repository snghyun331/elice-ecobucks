import { blogPostService } from "../services/blogpost-service.js";
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";
import { validateEmptyBody } from "../utils/validators.js"

const blogpostController = {
    blogpostPostWrite: async (req, res, next) => {
        try {
            validateEmptyBody(req)
            const { title, topic, content } = req.body;
    
            const userId = req.currentUserId;
            const newPost = await blogPostService.addPost({
                userId, title, topic, content
            });
            return res.status(CREATED).send(newPost);
        } catch (error) {
            next(error);
        }
    },  
    
    blogpostPutWrite: async function(req, res, next) {
        try{
            const post_id = req.params._id
            const { title, topic, content } = req.body;
            const toUpdate = { title, topic, content };
            const updatedPost = await blogPostService.setPost({
                post_id,
                toUpdate,
            });
    
            if (updatedPost.errorMessage) {
                throw new Error(updatedPost.errorMessage);
            }
    
            return res.status(OK).send(updatedPost);
    
        } catch (error) {
            next(error);
        }
    },

    blogpostDeleteWrite: async function(req, res, next) {
        try{
            const post_id = req.params._id
            const result = await blogPostService.deletePost({ post_id });
    
            if (result.errorMessage) {
                throw new Error(result.errorMessage);
            }
    
            return res.status(OK).send(result);
    
        } catch(error) {
            error.status = NOT_FOUND;
            next(error);
        }
    },

    blogpostPutLikes: async function(req, res, next) {
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
    
            return res.status(OK).send(AddLike)
        } catch(error) {
            next(error);
        }
    },
    
    blogpostPutDislikes: async function(req, res, next) {
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
    
            return res.status(OK).send(DeleteLike);
        } catch(error) {
            next(error)
        }
    },
    
    blogpostGetAll: async function(req, res, next) {
        let posts;
        try{
            if(req.query.topic) {
                const topic = req.query.topic
                posts = await blogPostService.getFilteredPosts({ topic });
                res.status(OK).send(posts);
            }
            else {
                const page = parseInt(req.query.page || 1);
                const { posts, totalPage } = await blogPostService.getPosts(page);
                
                res.status(OK).send({
                    currentPage: page,
                    totalPage: totalPage,
                    posts,
                });
            }
        } catch(error) {
            error.status = NOT_FOUND;
            next(error)
        }
    },

    blogpostGetDetail: async function(req, res, next) {
        try{
            const post_id = req.params._id;
            const postInfo = await blogPostService.getPostsDetail({ post_id })
    
            if (postInfo.errorMessage) {
                throw new Error(postInfo.errorMessage);
            }
            return res.status(OK).send(postInfo);
        } catch(error) {
            error.status = NOT_FOUND;
            next(error)
        }
    }
}

export { blogpostController };
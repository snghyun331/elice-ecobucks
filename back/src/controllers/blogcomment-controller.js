import { blogCommentService } from "../services/blogcomment-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";


const blogcommentController = {
    blogcommentPostWrite: async (req, res, next) => {
        try {
            validateEmptyBody(req)
            const post_id = req.params._id
            const writer_id = req.currentUserId;
            const { comment } = req.body;

            const newComment = await blogCommentService.addComment({
                post_id, writer_id, comment
            });
            
            return res.status(CREATED).send(newComment);
        } catch (error) {
            next(error);
        }
    }, 
    
    blogcommentPutWrite: async function(req, res, next) {
        try{
            const comment_id = req.params._id
            const { comment } = req.body;
            const toUpdate = { comment };
            const updatedComment = await blogCommentService.setComment({
                comment_id, 
                toUpdate
            })
    
            if (updatedComment.errorMessage) {
                throw new Error(updatedComment.errorMessage);
            }
    
            return res.status(OK).send(updatedComment);
    
        } catch (error) {
            next(error)
        }
    },
    
    blogcommentDeleteWrite: async function(req, res, next) {
        try{
            const comment_id = req.params._id
            const result = await blogCommentService.deleteComment({ comment_id })
    
            if (result.errorMessage) {
                throw new Error(result.errorMessage)
            }
    
            return res.status(NO_CONTENT).send(result)
    
        } catch(error) {
            error.status = NOT_FOUND;
            next(error)
        }
    },

    blogcommentGetAll: async function(req, res, next) {
        try {
            const comments = await blogCommentService.findAllComments();

            res.status(OK).send(comments);
        } catch (error) {
        next(error);
        }
    }
}

export { blogcommentController };
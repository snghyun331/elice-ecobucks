import { blogCommentService } from "../services/blogcomment-service.js";
import is from '@sindresorhus/is';
import { CREATED, OK } from "../utils/constants.js";

const blogcommentPostWrite = async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
    
        const { post_id, writer_id, comment } = req.body;

        const newComment = await blogCommentService.addComment({
            post_id, writer_id, comment
        });
        
        return res.status(CREATED).json(newComment);
    } catch (error) {
        next(error);
    }
};  

const blogcommentPutWrite = async function(req, res, next) {
    try{
        const comment_id = req.params._id
        const { comment } = req.body;
        const toUpdate = { comment };
        const updatedComment = await blogCommentService.setComment({
            commentId, 
            toUpdate
        })

        if (updatedComment.errorMessage) {
            throw new Error(updatedComment.errorMessage);
        }

        return res.status(OK).json(updatedComment);

    } catch (error) {
        next(error)
    }
}


const blogcommentDeleteWrite = async function(req, res, next) {
    try{
        const comment_id = req.params._id
        const result = await blogCommentService.deleteComment({ comment_id })

        if (result.errorMessage) {
            throw new Error(result.errorMessage)
        }

        return res.status(OK).send(result)

    } catch(error) {
        next(error)
    }
}
export {blogcommentPostWrite, blogcommentPutWrite, blogcommentDeleteWrite};
import { blogCommentService } from "../services/blogCommentService.js";
import is from '@sindresorhus/is';

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
        
        return res.status(201).json(newComment);
    } catch (error) {
        next(error);
    }
};  

const blogcommentPutWrite = async function(req, res, next) {
    try{
        const { comment_id, comment } = req.body;
        const toUpdate = {comment};
        const updatedComment = await blogCommentService.setComment({
            comment_id, 
            toUpdate
        })

        if (updatedComment.errorMessage) {
            throw new Error(updatedComment.errorMessage);
        }

        return res.status(200).json(updatedComment);

    } catch (error) {
        next(error)
    }
}
export {blogcommentPostWrite, blogcommentPutWrite};
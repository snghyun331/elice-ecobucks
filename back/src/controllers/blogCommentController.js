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


export {blogcommentPostWrite};
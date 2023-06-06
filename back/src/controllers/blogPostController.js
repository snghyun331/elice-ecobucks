import { blogPostService } from "../services/blogPostService.js";
import is from '@sindresorhus/is';

const blogpostPostWrite = async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
    
        const { title, topic, content } = req.body;

        const user_id = req.currentUserId;
        
        const newPost = await blogPostService.addPost({
            user_id,title,topic, content
        });
        
        return res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};  


export {blogpostPostWrite};
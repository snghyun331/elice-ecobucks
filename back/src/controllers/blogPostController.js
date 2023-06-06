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

        return res.status(200).json(updatedPost);

    } catch (error) {
        next(error)
    }
}


const blogpostDeleteWrite = async function(req, res, next) {
    try{
        const { post_id } = req.body;
        const result = await blogPostService.deletePost({ post_id });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        return res.status(200).send(result);

    } catch(error) {
        next(error)
    }
}

export {blogpostPostWrite, blogpostPutWrite, blogpostDeleteWrite};
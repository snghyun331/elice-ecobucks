import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {blogpostPostWrite, blogpostPutWrite, blogpostDeleteWrite,
    blogpostPutLikes} from "../controllers/blogPostController.js"

const blogPostRouter = Router();

blogPostRouter.post("/blog/write", login_required, blogpostPostWrite);

blogPostRouter.put("/blog/write", login_required, blogpostPutWrite)

blogPostRouter.delete("/blog/write", login_required, blogpostDeleteWrite)

blogPostRouter.put("/blog/:_id/likes", login_required, blogpostPutLikes)

export { blogPostRouter };

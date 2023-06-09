import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import {blogpostPostWrite, blogpostPutWrite, blogpostDeleteWrite,
    blogpostPutLikes, blogpostPutDislikes, blogpostGetAll,blogpostGetDetail} from "../controllers/blogpost-controller.js"

const blogPostRouter = Router();

blogPostRouter.post("/blog/write", login_required, blogpostPostWrite);

blogPostRouter.put("/blog/:_id/write", login_required, blogpostPutWrite)

blogPostRouter.delete("/blog/:_id", login_required, blogpostDeleteWrite)

blogPostRouter.put("/blog/:_id/likes", login_required, blogpostPutLikes)

blogPostRouter.put("/blog/:_id/dislikes", login_required, blogpostPutDislikes)

blogPostRouter.get("/blog", login_required, blogpostGetAll)

blogPostRouter.get("/blog/:_id", login_required, blogpostGetDetail)

export { blogPostRouter };

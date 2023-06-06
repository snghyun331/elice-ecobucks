import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {blogcommentPostWrite, blogcommentPutWrite} from "../controllers/blogCommentController.js"

const blogCommentRouter = Router();

blogCommentRouter.post("/blog/comment/write", login_required, blogcommentPostWrite);

blogCommentRouter.put("/blog/comment/write", login_required, blogcommentPutWrite)

export { blogCommentRouter };

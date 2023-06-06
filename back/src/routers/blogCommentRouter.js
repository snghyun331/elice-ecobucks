import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {blogcommentPostWrite} from "../controllers/blogCommentController.js"

const blogCommentRouter = Router();

blogCommentRouter.post("/blog/comment/write", login_required, blogcommentPostWrite);

export { blogCommentRouter };

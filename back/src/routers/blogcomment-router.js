import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { blogcommentController } from "../controllers/blogcomment-controller.js"

const blogCommentRouter = Router();

blogCommentRouter.post("/blog/comment/write", login_required, blogcommentController.blogcommentPostWrite);

blogCommentRouter.put("/blog/comment/:_id/write", login_required, blogcommentController.blogcommentPutWrite)

blogCommentRouter.delete("/blog/comment/:_id", login_required, blogcommentController.blogcommentDeleteWrite)

export { blogCommentRouter };

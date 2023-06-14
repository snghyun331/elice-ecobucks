import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { blogcommentController } from "../controllers/blogcomment-controller.js"
import { Validation } from "../middlewares/validation.js";

const blogcommentCreateValidation = Validation.validate(Validation.blogcommentSchema);
const blogcommentUpdateValidation = Validation.validate(Validation.blogcommentUpdateSchema);

const blogCommentRouter = Router();
blogCommentRouter.use(login_required);

blogCommentRouter.post("/blog/:_id/comment/write", blogcommentCreateValidation, blogcommentController.blogcommentPostWrite);

blogCommentRouter.put("/blog/comment/:_id/write", blogcommentUpdateValidation, blogcommentController.blogcommentPutWrite)

blogCommentRouter.delete("/blog/comment/:_id", blogcommentController.blogcommentDeleteWrite)

blogCommentRouter.get("/blogs/comments", blogcommentController.blogcommentGetAll);

export { blogCommentRouter };

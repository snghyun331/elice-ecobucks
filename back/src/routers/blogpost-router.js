import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { blogpostController } from "../controllers/blogpost-controller.js"

const blogPostRouter = Router();

blogPostRouter.post("/blog/write", login_required, blogpostController.blogpostPostWrite);

blogPostRouter.put("/blog/:_id/write", login_required, blogpostController.blogpostPutWrite)

blogPostRouter.delete("/blog/:_id", login_required, blogpostController.blogpostDeleteWrite)

blogPostRouter.put("/blog/:_id/likes", login_required, blogpostController.blogpostPutLikes)

blogPostRouter.put("/blog/:_id/dislikes", login_required, blogpostController.blogpostPutDislikes)

blogPostRouter.get("/blog", login_required, blogpostController.blogpostGetAll)

blogPostRouter.get("/blog/:_id", login_required, blogpostController.blogpostGetDetail)

export { blogPostRouter };

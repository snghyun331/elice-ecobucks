import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { blogpostController } from "../controllers/blogpost-controller.js"
import { Validation } from "../middlewares/validation.js";

const blogpostCreateValidation = Validation.validate(Validation.blogpostSchema);
const blogpostUpdateValidation = Validation.validate(Validation.blogpostUpdateSchema);

const blogPostRouter = Router();
blogPostRouter.use(login_required);

blogPostRouter.post("/blog/write", blogpostCreateValidation, blogpostController.blogpostPostWrite);

blogPostRouter.put("/blog/:_id/write", blogpostUpdateValidation, blogpostController.blogpostPutWrite)

blogPostRouter.delete("/blog/:_id", blogpostController.blogpostDeleteWrite)

blogPostRouter.put("/blog/:_id/likes", blogpostUpdateValidation, blogpostController.blogpostPutLikes)

blogPostRouter.put("/blog/:_id/dislikes", blogpostUpdateValidation, blogpostController.blogpostPutDislikes)

blogPostRouter.get("/blog", blogpostController.blogpostGetAll)

blogPostRouter.get("/blog/:_id", blogpostController.blogpostGetDetail)

export { blogPostRouter };

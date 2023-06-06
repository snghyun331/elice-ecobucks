import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import {blogpostPostWrite, blogpostPutWrite} from "../controllers/blogPostController.js"

const blogPostRouter = Router();

blogPostRouter.post("/blog/write", login_required, blogpostPostWrite);

blogPostRouter.put("/blog/write", login_required, blogpostPutWrite)

export { blogPostRouter };

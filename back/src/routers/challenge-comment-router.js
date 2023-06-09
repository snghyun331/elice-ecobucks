import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";

import { CommentCreate, CommentGetAll, CommentGet, 
  CommentUpdate, CommentDelete} from "../controllers/challenge-comment-controller.js"

const commentRouter = Router();

commentRouter.post("/:challengeId/comments", login_required, CommentCreate);

commentRouter.get("/:challengeId/comments", login_required, CommentGetAll);

commentRouter.get("/:challengeId/comments/:_id", login_required, CommentGet);

commentRouter.put("/:challengeId/comments/:_id", login_required, CommentUpdate);

commentRouter.delete("/:challengeId/comments/:_id", login_required, CommentDelete);

export { commentRouter };
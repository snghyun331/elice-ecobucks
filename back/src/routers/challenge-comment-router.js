import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";

import { commentController } from "../controllers/challenge-comment-controller.js"

const commentRouter = Router();

commentRouter.post("/:challengeId/comments", login_required, commentController.commentCreate);

commentRouter.get("/:challengeId/comments", login_required, commentController.commentGetAll);

commentRouter.get("/:challengeId/comments/:_id", login_required, commentController.commentGet);

commentRouter.put("/:challengeId/comments/:_id", login_required, commentController.commentUpdate);

commentRouter.delete("/:challengeId/comments/:_id", login_required, commentController.commentDelete);

export { commentRouter };
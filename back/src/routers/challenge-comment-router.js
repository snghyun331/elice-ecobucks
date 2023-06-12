import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";

import { commentController } from "../controllers/challenge-comment-controller.js"

const commentRouter = Router();

commentRouter.post("/challenges/:challengeId/comments", login_required, commentController.commentCreate);

commentRouter.get("/challenges/:challengeId/comments", login_required, commentController.commentGetAll);

commentRouter.get("/challenges/:challengeId/comments/:_id", login_required, commentController.commentGet);

commentRouter.put("/challenges/:challengeId/comments/:_id", login_required, commentController.commentUpdate);

commentRouter.delete("/challenges/:challengeId/comments/:_id", login_required, commentController.commentDelete);

export { commentRouter };
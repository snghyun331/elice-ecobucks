import { Router } from "express";
import { loginRequired } from "../middlewares/login-required.js";

import { commentController } from "../controllers/challenge-comment-controller.js"
import { Validation } from "../middlewares/validation.js";

const commentCreateValidation = Validation.validate(Validation.challengeCommentCreateSchema);
const commentUpdateValidation = Validation.validate(Validation.challengeCommentUpdateSchema);

const commentRouter = Router();
commentRouter.use(loginRequired);

commentRouter.post("/challenges/:challengeId/comments", commentCreateValidation, commentController.commentCreate);

commentRouter.get("/challenges/:challengeId/comments", commentController.commentGetAll);

commentRouter.get("/challenges/:challengeId/comments/:_id", commentController.commentGet);

commentRouter.put("/challenges/:challengeId/comments/:_id", commentUpdateValidation, commentController.commentUpdate);

commentRouter.delete("/challenges/:challengeId/comments/:_id", commentController.commentDelete);

export { commentRouter };
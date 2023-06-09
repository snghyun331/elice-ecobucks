import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { CommentService } from "../services/challenge-comment-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const commentRouter = Router();

commentRouter.post("/:challengeId/comments", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const challengeId = req.params.challengeId
    const userId = req.currentUserId;
    const { content } = req.body;
    
    const challenge = await CommentService.createComment({ userId, challengeId : challengeId, content });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:challengeId/comments", login_required, async function (req, res, next) {
  try {
    const challengeId = req.params.challengeId
    const comments = await CommentService.findComments({ challengeId });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:challengeId/comments/:_id", login_required, async function (req, res, next) {
  try {
    const { challengeId, _id } = req.params;
  
    const Comment = await CommentService.findComment({ challengeId, _id });
    res.json(Comment);
  } catch (err) {
    next(err);
  }
});

commentRouter.put("/:challengeId/comments/:_id", login_required, async function (req, res, next) {
  try {
    const { challengeId, _id } = req.params;
    const currentUserId = req.currentUserId;
    const { content } = req.body;  

    const comment = await CommentService.updateComment({ 
      challengeId, _id, currentUserId, content
    });
    
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete("/:challengeId/comments/:_id", login_required, async function (req, res, next){
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;

    await CommentService.deleteComment(_id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { commentRouter };
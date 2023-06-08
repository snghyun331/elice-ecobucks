import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { CommentService } from "../services/challenge-comment-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const commentRouter = Router();

commentRouter.post("/:challenge_id/comments", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const challengeId = req.params.challenge_id
    const userId = req.currentUserId;
    const { content } = req.body;
    
    const challenge = await CommentService.createComment({ userId, challenge_id : challengeId, content });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:challenge_id/comments", login_required, async function (req, res, next) {
  try {
    const challenge_id = req.params.challenge_id
    const comments = await CommentService.findComments({ challenge_id });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

commentRouter.get("/:challenge_id/comments/:_id", login_required, async function (req, res, next) {
  try {
    const { challenge_id, _id } = req.params;
  
    const Comment = await CommentService.findComment({ challenge_id, _id });
    res.json(Comment);
  } catch (err) {
    next(err);
  }
});

commentRouter.put("/:challenge_id/comments/:_id", login_required, async function (req, res, next) {
  try {
    const { challenge_id, _id } = req.params;
    const currentUserId = req.currentUserId;
    const { content } = req.body;  

    const comment = await CommentService.updateComment({ 
      challenge_id, _id, currentUserId, content
    });
    
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete("/:challenge_id/comments/:_id", login_required, async function (req, res, next){
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
import { CommentService } from "../services/challenge-comment-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";

const commentController = {
  commentCreate: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const challengeId = req.params.challengeId
      const userId = req.currentUserId;
      const { content } = req.body;
      
      const challenge = await CommentService.createComment({ userId, challengeId : challengeId, content });
      res.status(CREATED).json(challenge);
    } catch (error) {
      next(error);
    }
  },
  
  commentGetAll: async function (req, res, next) {
    try {
      const challengeId = req.params.challengeId
      const comments = await CommentService.findComments({ challengeId });
      res.status(OK).json(comments);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  commentGet: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
    
      const Comment = await CommentService.findComment({ challengeId, _id });
      res.status(OK).json(Comment);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  commentUpdate: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
      const currentUserId = req.currentUserId;
      const { content } = req.body;  
  
      const comment = await CommentService.updateComment({ 
        challengeId, _id, currentUserId, content
      });
      
      res.status(OK).json(comment);
    } catch (error) {
      next(error);
    }
  },
  
  commentDelete: async function (req, res, next){
    try {
      const _id = req.params._id;
      const currentUserId = req.currentUserId;
  
      await CommentService.deleteComment(_id, currentUserId);
       
      res.status(NO_CONTENT).json({ message: "challenge 삭제 완료"});
  
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  }

}


export { commentController }
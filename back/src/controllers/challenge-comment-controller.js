import { CommentService } from "../services/challenge-comment-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { CREATED, OK } from "../utils/constants.js";

const commentController = {
  commentCreate: async function (req, res, next) {
    try {
      console.log("오고있니")
      validateEmptyBody(req)
      const challengeId = req.params.challengeId
      const userId = req.currentUserId;
      const { content } = req.body;
      console.log(challengeId)
      const challenge = await CommentService.createComment({ userId, challengeId : challengeId, content });

      res.status(CREATED).send(challenge);
    } catch (error) {
      next(error);
    }
  },
  
  commentGetAll: async function (req, res, next) {
    try {
      const challengeId = req.params.challengeId
      const comments = await CommentService.findComments({ challengeId });
      res.status(OK).send(comments);
    } catch (error) {
      next(error);
    }
  },
  
  commentGet: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
    
      const Comment = await CommentService.findComment({ challengeId, _id });
      res.status(OK).send(Comment);
    } catch (error) {
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
      
      res.status(OK).send(comment);
    } catch (error) {
      next(error);
    }
  },
  
  commentDelete: async function (req, res, next){
    try {
      const _id = req.params._id;
      const currentUserId = req.currentUserId;
  
      await CommentService.deleteComment(_id, currentUserId);
       
      res.status(OK).send({ message: "challenge 삭제 완료"});
  
    } catch (error) {
      next(error);
    }
  }

}


export { commentController }
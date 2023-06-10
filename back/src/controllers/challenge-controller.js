import { ChallengeService } from "../services/challenge-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";

const challengeController = {
  challengeCreat: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const userId = req.currentUserId;
      const { title, content, icon, weeks } = req.body;
    
      const challenge = await ChallengeService.createChallenge({ userId, title, content, icon, weeks });
      res.status(CREATED).json(challenge);
    } catch (error) {
      next(error);
    }
  },

  challengeGetAll: async function (req, res, next) {
    try {
      const challenge = await ChallengeService.findChallenges( );
      res.status(OK).json(challenge);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },

  challengeGet: async function (req, res, next) {
    try {
      const chllengeId = req.params._id;
      const challenge = await ChallengeService.findChallenge({ chllengeId });
      res.status(OK).json(challenge);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  challengeUpdate: async function (req, res, next) {
    try {
      const chllengeId = req.params._id;
      const currentUserId = req.currentUserId;
      const { icon, title, content, weeks } = req.body;  
  
      const education = await ChallengeService.updateChallenge({ 
        chllengeId, currentUserId, title, content, icon, weeks, 
      });
      
      res.status(BAD_REQUEST).json(education);
    } catch (error) {
      next(error);
    }
  },
  
  challengeDelete: async function (req, res, next){
    try {
      const chllengeId = req.params._id;
      const currentUserId = req.currentUserId;
      await ChallengeService.deleteChallenge(chllengeId, currentUserId);
       
      res.status(NO_CONTENT).json({ message: "challenge 삭제 완료"});
  
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  }
}


export { challengeController }
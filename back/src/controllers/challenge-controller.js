import { ChallengeService } from "../services/challenge-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { OK } from "../utils/constants.js";

const challengeController = {
  challengeCreat: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const userId = req.currentUserId;
      const { title, content, icon, weeks } = req.body;
    
      const challenge = await ChallengeService.createChallenge({ userId, title, content, icon, weeks });
      res.json(challenge);
    } catch (err) {
      next(err);
    }
  },

  challengeGetAll: async function (req, res, next) {
    try {
      const challenge = await ChallengeService.findChallenges( );
      res.json(challenge);
    } catch (err) {
      next(err);
    }
  },

  challengeGet: async function (req, res, next) {
    try {
      const chllengeId = req.params._id;
      const challenge = await ChallengeService.findChallenge({ chllengeId });
      res.json(challenge);
    } catch (err) {
      next(err);
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
      
      res.json(education);
    } catch (error) {
      next(error);
    }
  },
  
  challengeDelete: async function (req, res, next){
    try {
      const chllengeId = req.params._id;
      const currentUserId = req.currentUserId;
      await ChallengeService.deleteChallenge(chllengeId, currentUserId);
       
      res.status(OK).json({ message: "challenge 삭제 완료"});
  
    } catch (error) {
      next(error);
    }
  }
}


export { challengeController }
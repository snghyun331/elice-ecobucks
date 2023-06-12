import { ParticipationService } from "../services/challenge-participation-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";

const participationController = {
  participationCreate: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const challengeId = req.params.challengeId
      const userId = req.currentUserId;
      const { image } = req.body;
      
      const challenge = await ParticipationService.createParticipation({ userId, challengeId : challengeId, image });
      res.status(CREATED).json(challenge);
    } catch (error) {
      next(error);
    }
  },
  
  participationGetAll: async function (req, res, next) {
    try {
      const challengeId = req.params.challengeId
      const participation = await ParticipationService.findChallenges({ challengeId });
      res.status(OK).json(participation);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  participationGet: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
    
      const participation = await ParticipationService.findChallenge({ challengeId, _id });
      res.status(OK).json(participation);
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  },
  
  participationUpdate: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
      const currentUserId = req.currentUserId;
      const { image } = req.body;  
  
      const participation = await ParticipationService.updateChallenge({ 
        challengeId, _id, currentUserId, image
      });
      
      res.status(OK).json(participation);
    } catch (error) {
      next(error);
    }
  },
  
  participationDelete: async function (req, res, next){
    try {
      const { challengeId, _id } = req.params;
      const currentUserId = req.currentUserId;
  
      await ParticipationService.deleteChallenge(challengeId, _id, currentUserId);
       
      res.status(NO_CONTENT).json({ message: "challenge 삭제 완료"});
  
    } catch (error) {
      error.status = NOT_FOUND;
      next(error);
    }
  }
}


export { participationController }
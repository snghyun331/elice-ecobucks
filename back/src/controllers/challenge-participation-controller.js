import { ParticipationService } from "../services/challenge-participation-service.js";
import { validateEmptyBody } from "../utils/validators.js"
import { CREATED, OK } from "../utils/constants.js";

const participationController = {
  participationCreate: async function (req, res, next) {
    try {
      validateEmptyBody(req)
      const challengeId = req.params.challengeId
      const userId = req.currentUserId;
      const { imageId } = req.body;

      const challenge = await ParticipationService.createParticipation({ userId, challengeId : challengeId, imageId });
      res.status(CREATED).send(challenge);
    } catch (error) {
      next(error);
    }
  },
  
  participationGetAll: async function (req, res, next) {
    try {
      const challengeId = req.params.challengeId
      const participation = await ParticipationService.findParticipations({ challengeId });
      res.status(OK).send(participation);
    } catch (error) {
      next(error);
    }
  },
  
  participationGet: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
    
      const participation = await ParticipationService.findParticipation({ challengeId, _id });
      res.status(OK).send(participation);
    } catch (error) {
      next(error);
    }
  },
  
  participationUpdate: async function (req, res, next) {
    try {
      const { challengeId, _id } = req.params;
      const currentUserId = req.currentUserId;
      const { imageId } = req.body;  
  
      const participation = await ParticipationService.updateParticipation({ 
        challengeId, _id, currentUserId, imageId
      });
      
      res.status(OK).send(participation);
    } catch (error) {
      next(error);
    }
  },
  
  participationDelete: async function (req, res, next){
    try {
      const { challengeId, _id } = req.params;
      const currentUserId = req.currentUserId;
  
      await ParticipationService.deleteParticipation(challengeId, _id, currentUserId);

      res.status(OK).send({ message: "challenge 삭제 완료" });
  
    } catch (error) {
      next(error);
    }
  }
}


export { participationController }
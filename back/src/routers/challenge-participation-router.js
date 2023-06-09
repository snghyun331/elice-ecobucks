import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { ParticipationService } from "../services/challenge-participation-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const participationRouter = Router();

participationRouter.post("/:challengeId/participants", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const challengeId = req.params.challengeId
    const userId = req.currentUserId;
    const { image } = req.body;
    
    const challenge = await ParticipationService.createParticipation({ userId, challengeId : challengeId, image });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

participationRouter.get("/:challengeId/participants", login_required, async function (req, res, next) {
  try {
    const challengeId = req.params.challengeId
    const participation = await ParticipationService.findChallenges({ challengeId });
    res.json(participation);
  } catch (err) {
    next(err);
  }
});

participationRouter.get("/:challengeId/participants/:_id", login_required, async function (req, res, next) {
  try {
    const { challengeId, _id } = req.params;
  
    const participation = await ParticipationService.findChallenge({ challengeId, _id });
    res.json(participation);
  } catch (err) {
    next(err);
  }
});

participationRouter.put("/:challengeId/participants/:_id", login_required, async function (req, res, next) {
  try {
    const { challengeId, _id } = req.params;
    const currentUserId = req.currentUserId;
    const { image } = req.body;  

    const participation = await ParticipationService.updateChallenge({ 
      challengeId, _id, currentUserId, image
    });
    
    res.json(participation);
  } catch (error) {
    next(error);
  }
});

participationRouter.delete("/:challengeId/participants/:_id", login_required, async function (req, res, next){
  try {
    const { challengeId, _id } = req.params;
    const currentUserId = req.currentUserId;

    await ParticipationService.deleteChallenge(challengeId, _id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { participationRouter };

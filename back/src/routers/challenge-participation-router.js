import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { ParticipationService } from "../services/challenge-participation-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const participationRouter = Router();

participationRouter.post("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const challengeId = req.params.challenge_id
    const userId = req.currentUserId;
    const { image } = req.body;
    
    const challenge = await ParticipationService.createParticipation({ userId, challenge_id : challengeId, image });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

participationRouter.get("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    const challenge_id = req.params.challenge_id
    const participation = await ParticipationService.findChallenges({ challenge_id });
    res.json(participation);
  } catch (err) {
    next(err);
  }
});

participationRouter.get("/:challenge_id/participants/:_id", login_required, async function (req, res, next) {
  try {
    const { challenge_id, _id } = req.params;
  
    const participation = await ParticipationService.findChallenge({ challenge_id, _id });
    res.json(participation);
  } catch (err) {
    next(err);
  }
});

participationRouter.put("/:challenge_id/participants/:_id", login_required, async function (req, res, next) {
  try {
    const { challenge_id, _id } = req.params;
    const currentUserId = req.currentUserId;
    const { image } = req.body;  

    const participation = await ParticipationService.updateChallenge({ 
      challenge_id, _id, currentUserId, image
    });
    
    res.json(participation);
  } catch (error) {
    next(error);
  }
});

participationRouter.delete("/:challenge_id/participants/:_id", login_required, async function (req, res, next){
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;

    const participation = await ParticipationService.deleteChallenge(_id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { participationRouter };

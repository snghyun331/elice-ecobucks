import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { ChallengeParticipationService } from "../services/challenge-participation-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const challengeParticipationRouter = Router();

challengeParticipationRouter.post("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const challengeId = req.params.challenge_id
    const user_id = req.currentUserId;
    const { imageURL } = req.body;
    
    const challenge = await ChallengeParticipationService.createChallengeParticipation({ user_id, challenge_id : challengeId, imageURL });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

export { challengeParticipationRouter };
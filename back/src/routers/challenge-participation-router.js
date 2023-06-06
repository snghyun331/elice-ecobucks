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

challengeParticipationRouter.get("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const challenge = await challengeService.findChallenges({ user_id });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeParticipationRouter.get("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const challenge = await challengeService.findChallenge({ _id });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeParticipationRouter.put("/:challenge_id/participants", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;
    const { icon, title, content, weeks } = req.body;  

    const education = await challengeService.updateChallenge({ 
      _id, currentUserId, title, content, icon, weeks, 
    });
    
    res.json(education);
  } catch (error) {
    next(error);
  }
});

challengeParticipationRouter.delete("/:challenge_id/participants", login_required, async function (req, res, next){
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;

    const challenge = await challengeService.deleteChallenge(_id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { challengeParticipationRouter };
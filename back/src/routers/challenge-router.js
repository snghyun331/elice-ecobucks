import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { ChallengeService } from "../services/challenge-service.js";
import { validateEmptyBody } from "../utils/validators.js"

const challengeRouter = Router();

challengeRouter.post("/", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const user_id = req.currentUserId;
    const { title, content, icon, weeks } = req.body;

    const challenge = await ChallengeService.createChallenge({ user_id, title, content, icon, weeks });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeRouter.get("/", login_required, async function (req, res, next) {
  try {
    const challenge = await ChallengeService.findChallenges( );
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeRouter.get("/:_id", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const challenge = await ChallengeService.findChallenge({ _id });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeRouter.put("/:_id", login_required, async function (req, res, next) {
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;
    const { icon, title, content, weeks } = req.body;  

    const education = await ChallengeService.updateChallenge({ 
      _id, currentUserId, title, content, icon, weeks, 
    });
    
    res.json(education);
  } catch (error) {
    next(error);
  }
});

challengeRouter.delete("/:_id", login_required, async function (req, res, next){
  try {
    const _id = req.params._id;
    const currentUserId = req.currentUserId;
    const challenge = await ChallengeService.deleteChallenge(_id, currentUserId);
     
    res.status(200).json({ message: "challenge 삭제 완료"});

  } catch (error) {
    next(error);
  }
});

export { challengeRouter };

import { Router } from "express";
import { login_required } from "../middlewares/login_required.js";
import { ChallengeService } from "../services/challengeService.js";
import { validateEmptyBody } from "../utils/validators.js"

const challengeRouter = Router();

challengeRouter.post("/", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const user_id = req.currentUserId;
    const { title, content, icon, DueDate } = req.body;

    const challenge = await ChallengeService.createChallenge({ user_id, title, content, icon, DueDate });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

challengeRouter.get("/", login_required, async function (req, res, next) {
  try {
    validateEmptyBody(req)
    const user_id = req.currentUserId;
    const { title, content, icon, DueDate } = req.body;

    const challenge = await ChallengeService.createChallenge({ user_id, title, content, icon, DueDate });
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

export { challengeRouter };

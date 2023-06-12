import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { challengeController } from "../controllers/challenge-controller.js"
const challengeRouter = Router();

challengeRouter.post("/challenges", login_required, challengeController.challengeCreat);

challengeRouter.get("/challenges", login_required, challengeController.challengeGetAll);

challengeRouter.get("/challenges/:_id", login_required, challengeController.challengeGet);

challengeRouter.put("/challenges/:_id", login_required, challengeController.challengeUpdate);

challengeRouter.delete("/challenges/:_id", login_required, challengeController.challengeDelete);

export { challengeRouter };

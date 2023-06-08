import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { challengeController } from "../controllers/challenge-controller.js"
const challengeRouter = Router();

challengeRouter.post("/", login_required, challengeController.challengeCreat);

challengeRouter.get("/", login_required, challengeController.challengeGetAll);

challengeRouter.get("/:_id", login_required, challengeController.challengeGet);

challengeRouter.put("/:_id", login_required, challengeController.challengeUpdate);

challengeRouter.delete("/:_id", login_required, challengeController.challengeDelete);

export { challengeRouter };

import { Router } from "express";
import { loginRequired } from "../middlewares/login-required.js";
import { challengeController } from "../controllers/challenge-controller.js"
import { Validation } from "../middlewares/validation.js";

const challengeCreateValidation = Validation.validate(Validation.challengeCreateSchema);
const challengeUpdateValidation = Validation.validate(Validation.challengeUpdateSchema);

const challengeRouter = Router();
challengeRouter.use(loginRequired)

challengeRouter.post("/challenges", challengeCreateValidation, challengeController.challengeCreat);

challengeRouter.get("/challenges", challengeController.challengeGetAll);

challengeRouter.get("/challenges/:_id", challengeController.challengeGet);

challengeRouter.put("/challenges/:_id", challengeUpdateValidation, challengeController.challengeUpdate);

challengeRouter.delete("/challenges/:_id", challengeController.challengeDelete);

export { challengeRouter };

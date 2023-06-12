import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { participationController } from "../controllers/challenge-participation-controller.js"

const participationRouter = Router();

participationRouter.post("/challenges/:challengeId/participants", login_required, participationController.participationCreate);

participationRouter.get("/challenges/:challengeId/participants", login_required, participationController.participationGetAll);

participationRouter.get("/challenges/:challengeId/participants/:_id", login_required, participationController.participationGet);

participationRouter.put("/challenges/:challengeId/participants/:_id", login_required, participationController.participationUpdate);

participationRouter.delete("/challenges/:challengeId/participants/:_id", login_required, participationController.participationDelete);

export { participationRouter };

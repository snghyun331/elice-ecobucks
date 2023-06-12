import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { participationController } from "../controllers/challenge-participation-controller.js"

const participationRouter = Router();

participationRouter.post("/:challengeId/participants", login_required, participationController.participationCreate);

participationRouter.get("/:challengeId/participants", login_required, participationController.participationGetAll);

participationRouter.get("/:challengeId/participants/:_id", login_required, participationController.participationGet);

participationRouter.put("/:challengeId/participants/:_id", login_required, participationController.participationUpdate);

participationRouter.delete("/:challengeId/participants/:_id", login_required, participationController.participationDelete);

export { participationRouter };

import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { ParticipationCreate, ParticipationGetAll, ParticipationGet, 
  ParticipationUpdate, ParticipationDelete} from "../controllers/challenge-participation-controller.js"

const participationRouter = Router();

participationRouter.post("/:challengeId/participants", login_required, ParticipationCreate);

participationRouter.get("/:challengeId/participants", login_required, ParticipationGetAll);

participationRouter.get("/:challengeId/participants/:_id", login_required, ParticipationGet);

participationRouter.put("/:challengeId/participants/:_id", login_required, ParticipationUpdate);

participationRouter.delete("/:challengeId/participants/:_id", login_required, ParticipationDelete);

export { participationRouter };

import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { challengeCreate, challengeGetAll, challengeGet, challengeUpdate, challengeDelete } from "../controllers/challenge-controller.js"
const challengeRouter = Router();

challengeRouter.post("/", login_required, challengeCreate);

challengeRouter.get("/", login_required, challengeGetAll);

challengeRouter.get("/:_id", login_required, challengeGet);

challengeRouter.put("/:_id", login_required, challengeUpdate);

challengeRouter.delete("/:_id", login_required, challengeDelete);

export { challengeRouter };

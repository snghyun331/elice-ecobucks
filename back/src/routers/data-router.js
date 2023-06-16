import { Router } from "express";
import { getSeoulUsage, getDistrictUsage, getSeasonalUsage } from "../controllers/data-controller.js";

const dataRouter = Router();

dataRouter.get("/data/seoulUsage", getSeoulUsage);

dataRouter.get("/data/districtUsage", getDistrictUsage);

dataRouter.get("/data/seasonalUsage", getSeasonalUsage);


export { dataRouter };
import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { orderPostCreate, orderGetMypage } from "../controllers/order-controller.js";

const orderRouter = Router();
orderRouter.use(login_required);

orderRouter.post("/orders", orderPostCreate);
orderRouter.get("/mypage/orders", orderGetMypage);

export { orderRouter };
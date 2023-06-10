import { Router } from "express";
import { login_required } from "../middlewares/login-required.js";
import { orderController } from "../controllers/order-controller.js";

const orderRouter = Router();

orderRouter.use(login_required);

orderRouter.post("/orders", orderController.orderPostCreate);
orderRouter.get("/mypage/orders", orderController.orderGetMypage);

export { orderRouter };
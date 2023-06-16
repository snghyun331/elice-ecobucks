import { Router } from "express";
import { loginRequired } from "../middlewares/login-required.js";
import { orderController } from "../controllers/order-controller.js";

const orderRouter = Router();

orderRouter.use(loginRequired);

orderRouter.post("/orders", orderController.orderPostCreate);

orderRouter.get("/mypage/orders", orderController.orderGetMypage);

export { orderRouter };
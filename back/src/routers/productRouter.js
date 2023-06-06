import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { productValidation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login_required.js";

const productRouter = Router();

productRouter.post(
  "/products",
  login_required,
  productValidation,
  productController.productPost_create
);

export { productRouter };

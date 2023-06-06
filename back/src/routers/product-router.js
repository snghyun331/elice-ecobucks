import { Router } from "express";
import { productPostCreate, productPutUpdate } from "../controllers/product-controller.js";
import { productValidation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login-required.js";

const productRouter = Router();

productRouter.post( "/products", login_required, productValidation, productPostCreate );

productRouter.put( "/products/:_id", login_required, productPutUpdate )

export { productRouter };

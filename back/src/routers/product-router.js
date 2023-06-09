import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
import { Validation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login-required.js";

const productValidation = Validation.validate(Validation.productSchema);

const controller = productController; 
const productRouter = Router();
productRouter.use(login_required);

//상품 등록
productRouter.post("/products", productValidation, controller.productPostCreate);

//전체 상품 조회
productRouter.get("/products", controller.productGetAll);

//개별 상품 조회
productRouter.get("/products/:_id", controller.productGetById);

//상품 정보 수정
productRouter.put("/products/:_id", productValidation, controller.productPutUpdate);

//개별 상품 삭제
productRouter.delete("/products/:_id", controller.productDelete)

export { productRouter };

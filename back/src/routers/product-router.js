import { Router } from "express";
import { productController } from "../controllers/product-controller.js";
import { Validation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login-required.js";

const productCreateValidation = Validation.validate(Validation.productSchema);
const productUpdateValidation = Validation.validate(Validation.productUpdateSchema);

const productRouter = Router();
productRouter.use(login_required);

//상품 등록
productRouter.post("/products", productCreateValidation, productController.productPostCreate);

//전체 상품 조회
productRouter.get("/products", productController.productGetAll);

//개별 상품 조회
productRouter.get("/products/:_id", productController.productGetById);

//상품 정보 수정
productRouter.put("/products/:_id", productUpdateValidation, productController.productPutUpdate);

//개별 상품 삭제
productRouter.delete("/products/:_id", productController.productDelete)

export { productRouter };

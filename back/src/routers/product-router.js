import { Router } from "express";
import { productPostCreate, productPutUpdate, productGetAll, productGetById, productDelete } from "../controllers/product-controller.js";
import { Validation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login-required.js";

const productValidation = Validation.validate(Validation.productSchema);
const productRouter = Router();
productRouter.use(login_required);

//상품 등록
productRouter.post("/products", productValidation, productPostCreate);

//전체 상품 조회
productRouter.get("/products", productGetAll);

//개별 상품 조회
productRouter.get("/products/:_id", productGetById);

//상품 정보 수정
productRouter.put("/products/:_id", productPutUpdate);

productRouter.delete("/products/:_id", productDelete)

export { productRouter };

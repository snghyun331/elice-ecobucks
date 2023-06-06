import { Router } from "express";
import { productPostCreate, productPutUpdate, productGetAll, productGetById } from "../controllers/product-controller.js";
import { productValidation } from "../middlewares/validation.js";
import { login_required } from "../middlewares/login-required.js";

const productRouter = Router();
productRouter.use(login_required);

//상품 등록
productRouter.post( "/products", productValidation, productPostCreate );

//전체 상품 조회
productRouter.get( "/products", productGetAll );

//개별 상품 조회
productRouter.get( "/products/:_id", productGetById );

//상품 정보 수정
productRouter.put( "/products/:_id", productPutUpdate );



export { productRouter };

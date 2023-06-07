import { productService } from "../services/product-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { userAuthService } from "../services/user-service.js";

const productPostCreate = async function(req, res, next) {
  try {

    validateEmptyBody(req)

    const { name, price, place, stock, description } = req.body;

    const seller = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({ userId:seller });
    const sellerName = currentUserInfo.username;

    const newProduct = await productService.addProduct({ seller, sellerName, name, price, place, stock, description });
    if (newProduct.errorMessage) {
      throw new Error(newProduct.errorMessage);
    }

    return res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
}

const productPutUpdate = async function(req, res, next) {
  try {
    const productId = req.params._id;
    const sellerId = req.currentUserId;

    const { name, price, place, stock, description } = req.body ?? null;
    const toUpdate = { name, price, place, stock, description };

    const product = await productService.updateProduct({ productId, sellerId, toUpdate });

    if (product.errorMessage) {
      throw new Error(product.errorMessage);
    }
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

const productGetAll = async function(req, res, next) {
  try {
    const products = await productService.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const productGetById = async function(req, res, next) {
  try {
    const productId = req.params._id;
    const product = await productService.findProduct({ productId });

    if (product.errorMessage) {
      throw new Error(product.errorMessage);
    }
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
}

const productDelete = async function(req, res, next) {
  try {
    const productId = req.params._id;
    const sellerId = req.currentUserId;
    const result = await productService.deleteProduct({ productId, sellerId });

    if (!result) {
      throw new Error("해당 상품을 삭제할 수 없습니다.");
    }

    return res.status(204).send(result);
  } catch (error) {
    next(error);
  }
}


export { productPostCreate, productPutUpdate, productGetAll, productGetById, productDelete };
//트리쉐이킹 : 메모리최적화. 
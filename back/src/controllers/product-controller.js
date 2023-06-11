import { productService } from "../services/product-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { userAuthService } from "../services/user-service.js";
import { CREATED, OK } from "../utils/constants.js";

const productController = {
  productPostCreate: async function (req, res, next) {
    try {
      validateEmptyBody(req)

      const { name, price, place, stock, description } = req.body;
      const seller = req.currentUserId;
      
      const currentUserInfo = await userAuthService.getUserInfo({ userId: seller });
      const sellerName = currentUserInfo.username;
      const newProduct = { seller, sellerName, name, price, place, stock, description }

      const createdNewProduct = await productService.addProduct(newProduct);
      if (newProduct.errorMessage) {
        throw new Error(newProduct.errorMessage);
      }

      return res.status(CREATED).json(createdNewProduct);
    } catch (error) {
      next(error);
    }
  },

  productPutUpdate: async function (req, res, next) {
    try {
      const productId = req.params._id;
      const sellerId = req.currentUserId;

      const { name, price, place, stock, description } = req.body ?? null;
      const toUpdate = { name, price, place, stock, description };

      const product = await productService.updateProduct({ productId, sellerId, toUpdate });

      if (product.errorMessage) {
        throw new Error(product.errorMessage);
      }
      return res.status(OK).send(product);
    } catch (error) {
      next(error);
    }
  },

  productGetAll: async function (req, res, next) {
    try {
      const products = await productService.findAllProducts();
      res.status(OK).json(products);
    } catch (error) {
      next(error);
    }
  },

  productGetById: async function (req, res, next) {
    try {
      const productId = req.params._id;
      const product = await productService.findProduct(productId);
      return res.status(OK).send(product);
    } catch (error) {
      next(error);
    }
  },

  productDelete: async function (req, res, next) {
    try {
      const productId = req.params._id;
      const sellerId = req.currentUserId;
      const result = await productService.deleteProduct({ productId, sellerId });

      if (!result) {
        throw new Error("해당 상품을 삭제할 수 없습니다.");
      }

      return res.status(OK).send(result);
    } catch (error) {
      next(error);
    }
  }
}


export { productController };
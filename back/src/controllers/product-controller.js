import is from "@sindresorhus/is";
import { productService } from "../services/product-service.js";

const productPostCreate = async function(req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { name, price, place, stock, description } = req.body;

    const seller = req.currentUserId;

    const newProduct = await productService.addProduct({ seller, name, price, place, stock, description });
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

export { productPostCreate, productPutUpdate };
//트리쉐이킹 : 메모리최적화. 
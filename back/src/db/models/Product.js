import { productModel } from "../schemas/product.js";

class Product {
  static async create({ newProduct }) {
    const createdNewProduct = await productModel.create(newProduct);
    return createdNewProduct;
  }
}

export { Product };

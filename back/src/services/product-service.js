import { Product } from "../db/models/product.js";

class productService {
  static async addProduct({
    seller,
    name,
    price,
    place,
    stock,
    description,
    createdAt,
  }) {
    const newProduct = {
      seller,
      name,
      price,
      place,
      stock,
      description,
      createdAt,
    };

    //db에 저장
    const createdNewProduct = await Product.create({ newProduct });

    return createdNewProduct;
  }
}

export { productService };

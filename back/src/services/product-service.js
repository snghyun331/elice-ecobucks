import { Product } from "../db/models/product.js";

class productService {
  static async addProduct({ seller, name, price, place, stock, description }) {
    const newProduct = { seller, name, price, place, stock, description };

    //db에 저장
    const createdNewProduct = await Product.create({ newProduct });

    return createdNewProduct;
  }

  // static async updateProduct({ name, price, stock, description })
}

export { productService };

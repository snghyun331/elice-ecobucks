import { productModel } from "../schemas/product.js";

class Product {
  static async findById(productId) {
    const product = await productModel.findOne({ _id: productId });
    return product;
  }

  static async create({ newProduct }) {
    const createdNewProduct = await productModel.create(newProduct);
    return createdNewProduct;
  }

  static async update({ productId, fieldToUpdate, newValue }) {
    const filter = { _id: productId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedProduct = await productModel.findOneAndUpdate( filter, update, option );
    return updatedProduct;
  }

  static async findAll() {
    const products = await productModel.find();
    return products
  }

  static async deleteById({ productId }) {
    const deleteResult = await productModel.deleteOne({ _id: productId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Product };

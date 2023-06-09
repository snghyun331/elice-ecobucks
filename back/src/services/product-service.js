import { Product } from "../db/models/product.js";

class productService {
  static async addProduct({ seller, sellerName, name, price, place, stock, description }) {
    const newProduct = { seller, sellerName, name, price, place, stock, description };

    //db에 저장
    const createdNewProduct = await Product.create({ newProduct });

    return createdNewProduct;
  }

  static async updateProduct({ productId, sellerId, toUpdate }) {
    let product = await Product.findById({ productId });
    
    // 상품이 없는 경우 오류 메시지
    if (!product) {
      const errorMessage =
        "해당 id의 상품이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if( product.seller.toString() !== sellerId )
      throw new Error("수정 권한이 없습니다.");

    const fieldsToUpdate = {
      name: "name",
      price: "price",
      place: "place",
      stock: "stock",
      description: "description",
    };

    for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
      if (toUpdate[field] || field === "description") {
        const newValue = toUpdate[field];
        product = await Product.update({ productId, fieldToUpdate, newValue, });
      }
    }
    return product;
  }

  static async findAllProducts() {
    const products = await Product.findAll();
    return products;
  }

  static async findProduct({ productId }) {
    const product = await Product.findById({ productId })
    return product
  }

  static async deleteProduct({ productId, sellerId }) {
    const product = await Product.findById({ productId });

    if(product.seller.toString() !== sellerId) 
      throw new Error("수정 권한이 없습니다.");

    const isDataDeleted = await Product.deleteById({ productId });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 상품이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok" };
  }

  static async decreaseProductStock(productId) {
    try {
      const product = await Product.findById({ productId });

      if (!product) {
        throw new Error("상품을 찾을 수 없습니다.");
      }

      if (product.stock <= 0) {
        throw new Error("상품 재고가 부족합니다.");
      }

      product.stock -= 1; // 재고 감소
      await product.save();
      console.log(product.stock)
      return product;
    } catch (error) {
      throw new Error(`상품 재고를 감소시키는 도중 오류가 발생했습니다: ${ error.message }`);
    }
  }
}


export { productService };

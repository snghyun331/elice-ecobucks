import { Product } from "../db/models/product.js";

class productService {
  static async addProduct({ seller, name, price, place, stock, description }) {
    const newProduct = { seller, name, price, place, stock, description };

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
        product = await Product.update({
          productId,
          fieldToUpdate,
          newValue,
        });
      }
    }
    return product;
  }

  static async findAllProducts() {
    const products = await Product.findAll();
    return products;
  }

  static async findProduct( { productId }) {
    const product = await Product.findById({ productId })
    return product
  }
}

export { productService };

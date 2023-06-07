import { mongoose, Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: mongoose.Schema.Types.String,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "상품 상세 설명이 없습니다.",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

export { productModel };

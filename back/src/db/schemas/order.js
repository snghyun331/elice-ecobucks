import { mongoose, Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    buyerName: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    productName: {
      type: mongoose.Schema.Types.String,
      ref: "Product",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }
  },
  {
    timestamps: true,
  }
);

const orderModel = model("Order", orderSchema);

export { orderModel };

import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  order_date: {
    type: Date,
    default: Date.now,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const OrderModel = mongoose.model("Order", OrderSchema);

export { OrderModel };

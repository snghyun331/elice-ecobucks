import { orderModel } from "../schemas/order.js";

class order{
    static async findById({ orderId }) {
        const order = await orderModel.findOne({ _id: orderId });
        return order;
    }

    static async create({ newOrder }) {
        const createdNewOrder = await orderModel.create(newOrder);
        return createdNewOrder;
    }

    static async find({ buyer }) {
        const orders = await orderModel.find({ buyer });
        return orders;
    }
}

export { order };
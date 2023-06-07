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

    static async find({ userId }) {
        const orders = await orderModel.find({ buyer: userId });
        return orders;
    }
}

export { order };
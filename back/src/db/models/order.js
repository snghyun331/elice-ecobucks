import { orderModel } from "../schemas/order.js";

class order{
    static async findById({ orderId }) {
        const order = await orderModel.findOne({ _id: orderId });
        return order;
    }

    static async create(newOrder) {
        const createdNewOrder = await orderModel.create(newOrder);
        return createdNewOrder;
    }

    static async findAll({ buyer }) {
        const orders = await orderModel.find({ buyer });
        return orders;
    }

    static async findAndCountByBuyer({ buyer, skip, limit }) {
        const orders = await orderModel.find({ buyer })
                        .sort({ createdAt: -1 })  
                        .skip(skip)
                        .limit(limit)
                        .exec();
        const count = await orderModel.countDocuments({ buyer });
        return { orders, count };
    }
}

export { order };
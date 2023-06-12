import { order } from "../db/models/order.js";

class orderService {
    static async addOrder({ newOrder }) {
        const createdOrder = await order.create({ newOrder });
        return createdOrder;
    }

    static async getUserOrders({userId}) {
        const orders = await order.find({ buyer: userId });
        return orders;
    }
}

export { orderService };
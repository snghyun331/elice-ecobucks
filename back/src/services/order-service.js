import { order } from "../db/models/order.js";

class orderService {
    static async addOrder({ buyer, buyerName, productId }) {
        const newOrder = { buyer, buyerName, productId }

        const createdNewOrder = await order.create({ newOrder });

        return createdNewOrder;
    }

    static async getUserOrders(userId) {
        const orders = await order.find({ buyer: userId });
        console.log('서비스');
        return orders;
    }
}

export { orderService };
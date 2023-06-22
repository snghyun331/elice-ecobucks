import { order } from "../db/models/order.js";
import { productService } from "./product-service.js";
import { userAuthService } from "./user-service.js";

const orderService = {
    createOrder: async function ({ productId, buyer }) {
        try{
            const { name, price, place, stock } = await productService.findProduct(productId);
            const buyerInfo = await userAuthService.getUserInfo({ userId: buyer });
            const { mileage: buyerMileage } = buyerInfo;

            if (stock <= 0) {
                throw new Error("재고가 부족합니다.");
            }
    
            if (buyerMileage < price) {
                throw new Error("마일리지가 부족합니다.");
            }

            //상품 재고 감소
            await this.decreaseProductStock(productId);

            //마일리지 차감
            await this.subtractMileage(productId, buyer);

            //주문 생성
            const newOrder = { productName: name, price, buyer, place };
            const createdOrder = await order.create(newOrder);
            if (!createdOrder) {
                throw new Error("주문에 실패하였습니다.");
            }
    
            return createdOrder;
        } catch (error) {
            throw error;
        }
    },

    subtractMileage: async function (productId, buyer) {
        const product = await productService.findProduct(productId);
        const requiredMileage = product.price;

        const buyerInfo = await userAuthService.getUserInfo({ userId: buyer });
        const { mileage: buyerMileage } = buyerInfo;

        if (buyerMileage < requiredMileage) {
            throw new Error("마일리지가 부족합니다.");
        }

        await userAuthService.subtractMileage(buyer, requiredMileage);
    },

    decreaseProductStock: async function(productId) {
        await productService.decreaseProductStock(productId);
    },


    getOrdersByBuyer: async function({ buyer, page }) {
        const limit = 5;
        const skip = (page - 1) * limit;
        const { orders, count } = await order.findAndCountByBuyer({ buyer, skip, limit });
        const totalPages = Math.ceil(count / limit)

        const orderDetails = await Promise.all(
            orders.map(async (order) => {
    
                const { productName, price, place, createdAt } = order;
    
                return {
                    date: createdAt,
                    product: productName,
                    price: price,
                    location: place,
                };
            })
        );
        return { orderDetails, totalPages };
    },
}

export { orderService };
import { order } from "../db/models/order.js";
import { productService } from "./product-service.js";
import { userAuthService } from "./user-service.js";

const orderService = {
    createOrder: async function ({ productId, buyer }) {
        try{
            //마일리지 차감
            await this.subtractMileage(productId, buyer);

            //상품 재고 감소
            await this.decreaseProductStock(productId);

            const { name, price, place } = await productService.findProduct(productId);
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
                // const { productId, createdAt } = order;
                // const product = await productService.findProduct(productId);
                
                // if (!product) {
                //     // 상품을 찾지 못한 경우에 대한 처리
                //     throw new Error("해당 id의 상품을 찾을 수 없습니다.")
                // }
    
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
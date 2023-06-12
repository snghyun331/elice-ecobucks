import { orderService } from "../services/order-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { userAuthService } from "../services/user-service.js";
import { productService } from "../services/product-service.js";
import { NOT_FOUND, CREATED, OK, NO_CONTENT } from "../utils/constants.js";

const orderController = {
    orderPostCreate: async function(req, res, next) {
        try{
            validateEmptyBody(req)
            const { productId } = req.body;
            const buyer = req.currentUserId;

            const newOrder = { 
                productId, 
                buyer, 
            }
            const createdOrder = await orderService.addOrder({ newOrder })

            // 상품 가격만큼 마일리지 차감
            const product = await productService.findProduct({ productId });
            const requiredMileage = product.price;  

            const buyerInfo = await userAuthService.getUserInfo({ userId: buyer });
            const { mileage: buyerMileage } = buyerInfo;

            if (buyerMileage < requiredMileage) {
                throw new Error("마일리지가 부족합니다.");
            }
            await userAuthService.subtractMileage(buyer, requiredMileage);
            
            // 상품 재고 감소
            await productService.decreaseProductStock(productId);
            
            if (createdOrder.errorMessage) {
                throw new Error(createdOrder.errorMessage);
            }
        
            return res.status(CREATED).send(createdOrder);
        } catch (error) {
        next(error);
        }
    },

    orderGetMypage: async function(req, res, next) {
        try {
            const userId = req.currentUserId;
            const orders = await orderService.getUserOrders({ userId });
    
            if (orders.length === 0) {
                return res.json({ message: '주문 내역이 없습니다.' });
            }
    
            const orderDetails = await Promise.all(
                orders.map(async (order) => {
                    const { productId, createdAt } = order;
                    const product = await productService.findProduct({ productId });
                    
                    if (!product) {
                        // 상품을 찾지 못한 경우에 대한 처리
                        return { error: '상품을 찾을 수 없습니다.' };
                      }
    
                    const { name, price, place } = product;
    
                    return {
                        date: createdAt,
                        product: name,
                        price: price,
                        location: place,
                    };
            }));    
    
            return res.status(OK).send(orderDetails);
        } catch (error) {
            error.status = NOT_FOUND;
            next(error);
        }
    }
}
export { orderController };
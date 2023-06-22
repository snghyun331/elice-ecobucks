import { orderService } from "../services/order-service.js";
import { validateEmptyBody } from "../utils/validators.js";
import { NOT_FOUND, CREATED, OK } from "../utils/constants.js";

const orderController = {
    orderPostCreate: async function(req, res, next) {
        try{
            validateEmptyBody(req)
            const { productId } = req.body;
            const buyer = req.currentUserId;

            const createdOrder = await orderService.createOrder({ productId, buyer })
        
            return res.status(CREATED).send(createdOrder);
        } catch (error) {
        next(error);
        }
    },

    orderGetMypage: async function(req, res, next) {
        try {
            const buyer = req.currentUserId;
            const page = parseInt(req.query.page || 1);
            const { orderDetails, totalPages } = await orderService.getOrdersByBuyer({ buyer, page });

            if (orderDetails.length === 0) {
                return res.json({ message: '주문 내역이 없습니다.' });
            }

            return res.status(OK).json({
                currentPage: page,
                totalPages: totalPages,
                orderDetails,
            });
        } catch (error) {
            error.status = NOT_FOUND;
            next(error);
        }
    },
    
}
export { orderController };
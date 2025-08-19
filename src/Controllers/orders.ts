import express from "express";
var router = express.Router();
import { OrderService } from "../Services/order-service";
import {asyncHandler} from "../utlis/asyncHandler";
import {RequestUser} from "../types/requestUser";

router.post('/create-order' , asyncHandler( async (req : RequestUser , res) => {
    const  { userId } = req
    const service = new OrderService()
    const order = await  service.createOrder(userId)

    res.status(200).json({
        message : 'Order place successfully',
        data : order
    })
})  )

router.get('/get-orders' , asyncHandler( async (req : RequestUser , res) => {
    const  { userId } = req
    const service = new OrderService()
    const order = await  service.getOrderList(userId)

    res.status(200).json({
        message : 'Order list',
        data : order
    })
})  )

export default  router
import express from "express";
var router = express.Router();
import  { CartService } from "../Services/cart-service";
import {asyncHandler} from "../utlis/asyncHandler";
import {RequestUser} from "../types/requestUser";

router.post('/add-cart', asyncHandler( async (req: RequestUser, res:any) => {
    const  { userId } = req
    const  { items } = req.body
    const service = new CartService()
    const  cart = await  service.addCart(userId , items)

    res.status(200).json({
        message : 'Cart updated successfully',
        cart
    })

} ))

router.get('/get-carts' , asyncHandler( async( req: RequestUser , res:Response) => {
    const  { userId } = req
    const service = new CartService()

    const carts = await service.getCart(userId)
    res.status(200).json({
        data : carts
    })

}  ) )

router.delete('/delete-cart/:id' , asyncHandler( async ( req: RequestUser , res : any ) => {
    const  { userId } = req
    const { id } = req.params;
    const service = new CartService()

    const carts = await  service.deleteItemFromCart(userId , id)

    res.status(200).json({
        message : 'Item deleted successfully',
        data : carts
    })

}) )

router.delete('/clear-cart' , asyncHandler( async (req : RequestUser , res : any) => {
    const  { userId } = req
    const service = new CartService()

    const cart = await service.clearCart(userId)

    res.status(200).json({
        message : 'Carts cleared successfully',
        data : cart
    })
}) )



export  default router
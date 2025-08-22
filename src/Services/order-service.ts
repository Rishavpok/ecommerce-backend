import Cart from "../Models/cart-model";
import Order from "../Models/order-model";
import orders from "../Controllers/orders";
import Orders from "../Controllers/orders";
import Product from "../Models/product-models";

export class OrderService  {
    constructor() {
    }
    async createOrder(userId: string) {
        // Get the user's cart
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
            throw {
                status: 400,
                message: "Cart is empty"
            };
        }

        // Calculate total price
        const totalPrice = cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);

        // Create order
        const order = new Order({
            user: userId,
            items: cart.items.map(item => ({
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                quantity: item.quantity
            })),
            totalPrice,
            status: "pending"
        });

        for (let item of cart.items) {
            if (item.product.stock < item.quantity) {
                throw {
                    status: 400,
                    message: `${item.product.name} is out of stock or insufficient quantity`
                };
            }
        }

        await order.save();

        // Optionally, clear the cart after order is placed
        cart.items = [];
        await cart.save();

        for (let item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                { $inc: { stock: -item.quantity } }, // decrement stock
                { new: true }
            );
        }

        return order;
    }

    async getOrderList(userId : string) {
        const orders = await Order.find({ user: userId }).populate('items.product');
        if(!orders) {
            throw ({
                status : 400,
                message: 'No orders found for this user'
            })
        }

        return orders
    }

    async cancelOrder(userId : string , orderId  : string) {
        const  order  = await Order.findOne({ _id : orderId , user : userId })
        if(!order ){
            throw ({
                status : 400,
                message: 'No orders found for this user'
            })
        }

        if(order.status !== 'pending' ) {
            throw ({
                status : 400,
                message: 'Only pending orders can be cancelled'
            })
        }
        order.status = "cancelled"
        await order.save();
        return order
    }

}
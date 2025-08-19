import Cart from "../Models/cart-model";
import Order from "../Models/order-model";
import orders from "../Controllers/orders";

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

        await order.save();

        // Optionally, clear the cart after order is placed
        cart.items = [];
        await cart.save();

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

}
import Cart from "../Models/cart-model";
import Product from "../Models/product-models";

export class CartService {
    constructor() {
    }

    async addCart( userId? : string , items : [] ) {
        if( !items || items.length < 0) {
            throw  {
                status : 400,
                message : 'Please provide items to add'
            }
        }

        const cart = await Cart.findOne({ user : userId })

        for (let newItem of items) {
            const product = await Product.findById(newItem.product);

            if (!product) {
                throw {
                    status: 404,
                    message: 'Product not found'
                };
            }

            if (product.stock < newItem.quantity) {
                throw {
                    status: 400,
                    message: `${product.name} has only ${product.stock} left in stock`
                };
            }
        }

        if(cart) {
            for (let newItem of items) {
                const existingItem = cart.items.find((item: any) => item.product.toString() === newItem.product);

                if (existingItem) {
                    // If item exists, update quantity
                    existingItem.quantity += newItem.quantity;
                } else {
                    // If not, push new item
                    cart.items.push(newItem);
                }
            }

            await cart.save();
            return cart;
        } else {
            const newCart = new Cart({
                user: userId,
                items: items
            });
            await newCart.save();
            return newCart;
        }
    }

    async deleteItemFromCart( userId : any , itemId:string ) {
       const cart = await  Cart.findOne({ user : userId })
        if(!cart) {
            throw {
                status: 404,
                message: "Cart not found"
            };
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter((item: any) => item._id.toString() !== itemId);

        if (cart.items.length === initialLength) {
            throw {
                status: 404,
                message: "Item not found in cart"
            };
        }

        await cart.save();

        return cart

    }

    async clearCart(userId : string) {
        const cart = await Cart.findOne({ user : userId })

        if(!cart) {
            throw {
                status: 404,
                message: "Cart not found"
            };
        }

        if(cart) {
            cart.items = []
            await cart.save()
        }

        return cart
    }

    async getCart(userId? : string) {
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        return cart

    }
}
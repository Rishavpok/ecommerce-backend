import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalPrice : {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "shipped", "delivered"],
        default: "pending"
    },
    paymentMethod: {
        type: String
    }
} , {
    timestamps : true
} )

const Order = mongoose.model("Order", OrderSchema);

export default Order;
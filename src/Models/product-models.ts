import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String
    },
    image: {
        type: String, // URL of image (later Cloudinary)
        required: true
    }
}, {
    timestamps: true // adds createdAt & updatedAt automatically
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;

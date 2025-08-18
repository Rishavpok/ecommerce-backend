import express from "express";

var router = express.Router();

import { ProductService } from "../Services/product-service";
import {asyncHandler} from "../utlis/asyncHandler";
import { upload } from "../Middleware/uploads";
// create new product

router.post(
    '/create-product',
    upload.single('image'),
    asyncHandler(async (req, res) => {
    const { name, description, price, stock, category, brand } = req.body;
    const image = req.file?.filename
    const service = new ProductService();
    const newProduct = await service.createProduct(name, description, price, stock, category, brand, image);
    res.status(200).json({ message: "Product created successfully", product: newProduct });
}));



router.put('/update-product/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, category, brand, image } = req.body;
    const service = new ProductService();
    const newProduct = await service.updateProduct(id, name, description, price, stock, category, brand, image);
    res.status(200).json({ message: "Product updated successfully", product: newProduct });
}));



router.delete('/delete-product/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const service = new ProductService();
    await service.deleteProduct(id);
    res.status(200).json({ message: "Product deleted successfully" });
}));

router.get('/lists', asyncHandler(async (req, res) => {
    const query = req

    const filter :any = {}

    if(req.query.category) filter.category = req.query.category
    if(req.query.brand) filter.brand = req.query.brand

    let sortOption = {}
    if (req.query.sort === 'price_asc') sortOption = { price: 1 };
    if (req.query.sort === 'price_desc') sortOption = { price: -1 };

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const service = new ProductService();
    const products = await service.getProductList(filter , sortOption , skip , limit);
    res.status(200).json({ data: products });
}));

export  default router

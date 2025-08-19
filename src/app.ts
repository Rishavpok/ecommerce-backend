import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { authMiddleware } from "./Middleware/authMiddleware";

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

import fs from 'fs';
import path from 'path';

// routes
import user from './Controllers/users'
import products from "./Controllers/products";
import {errorHandler} from "./Middleware/errorMiddleware";
import carts from "./Controllers/carts";
import Orders from "./Controllers/orders";

app.use('/api/users',user)
app.use('/api/product', authMiddleware, products )
app.use('/api/cart', authMiddleware , carts)
app.use('/api/order' , authMiddleware , Orders)


// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('E-Commerce API is running...');
});


// global error handler
app.use(errorHandler)


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

export default app;
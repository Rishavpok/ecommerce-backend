import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
    res.send('E-Commerce API is running...');
});

export default app;
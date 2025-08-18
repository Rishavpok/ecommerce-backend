import app from './app';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;


// Database setup

import  mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
const  db = mongoose.connection

db.on('error' , console.error.bind(console, 'MongoDB connection error:'));

db.once('open' , ()  => {
    console.log('Connected to Mongodb')
} )


app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
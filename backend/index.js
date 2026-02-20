import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connectDB.js';
import { connectCloudinary } from './config/cloudinary.js';

// Import routes
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.router.js';
import productroutes from './routes/product.routes.js';
import cartroutes from './routes/cart.routes.js';
import orderroutes from './routes/order.routes.js';
import addressroutes from './routes/address.routes.js';

dotenv.config();

const app = express();

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

//  Define allowed origin exactly matching your frontend URL
const allowedOrigins = ["http://localhost:5173"];

// Middlewares
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//  Serve static uploads folder
app.use("/images", express.static("uploads"));

//  API routes
app.use('/api/users', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/product', productroutes);
app.use('/api/cart', cartroutes);
app.use('/api/order', orderroutes);
app.use('/api/address', addressroutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});

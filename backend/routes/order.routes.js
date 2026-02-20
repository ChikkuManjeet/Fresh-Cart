import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD,placeOrderStripe } from "../controllers/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

// Place COD order
router.post("/cod", authUser, placeOrderCOD);

// Place Stripe order
router.post("/stripe", authUser, placeOrderStripe); 

// Get orders for logged-in user
router.get("/user", authUser, getUserOrders);

// Get all orders for seller/admin
router.get("/seller", authSeller, getAllOrders);

export default router;

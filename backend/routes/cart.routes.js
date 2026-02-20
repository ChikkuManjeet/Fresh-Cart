import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { updateCart } from "../controllers/cart.controller.js";

const router = express.Router();

// POST /api/cart/update
router.post("/update", authUser, updateCart);

export default router;

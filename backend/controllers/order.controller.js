import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ---------------------------------------------------------
    PLACE ORDER (COD)
--------------------------------------------------------- */
export const placeOrderCOD = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const { items, address } = req.body;
    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}`, success: false });
      }
      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.05); // 5% GST

    const order = await Order.create({
      userId: req.user._id,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
      paymentStatus: "Pending",
    });

    // CLEAR USER CART AFTER ORDER
    await User.findByIdAndUpdate(req.user._id, { cartItems: [] });

    res.status(201).json({ success: true, message: "Order Placed", orderId: order._id });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ---------------------------------------------------------
    PLACE ORDER (STRIPE / ONLINE PAYMENT)
--------------------------------------------------------- */
export const placeOrderStripe = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { items, address } = req.body;
    const { origin } = req.headers;

    // 1️⃣ CREATE ORDER
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}`, success: false });
      }
      amount += product.offerPrice * item.quantity;
    }
    amount += Math.floor(amount * 0.05); // GST

    const order = await Order.create({
      userId: req.user._id,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: false,
      paymentStatus: "Pending",
    });

    // 2️⃣ BUILD STRIPE LINE ITEMS
    const line_items = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      line_items.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [`${origin}/images/${product.image[0]}`],
          },
          unit_amount: Math.floor(product.offerPrice * 1.05 * 100), // includes GST
        },
        quantity: item.quantity,
      });
    }

    // 3️⃣ CREATE STRIPE SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      customer_email: req.user.email,

      // REQUIRED FOR INDIA EXPORT RULES
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },

      // ROUTES
      success_url: `${origin}/loading?next=my-orders&orderId=${order._id}`,
      cancel_url: `${origin}/loading?next=cart`,

      metadata: {
        orderId: order._id.toString(),
      },
    });

    // 4️⃣ SAVE PAYMENT INTENT ID
    order.paymentIntentId = session.payment_intent;
    await order.save();

    // 5️⃣ CLEAR USER CART IMMEDIATELY (optional: or after verification)
    await User.findByIdAndUpdate(req.user._id, { cartItems: [] });

    res.status(201).json({ success: true, url: session.url });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ---------------------------------------------------------
    VERIFY STRIPE PAYMENT (CALLED FROM FRONTEND)
--------------------------------------------------------- */
export const verifyStripePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (!order.paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Payment Intent missing",
      });
    }

    const sessions = await stripe.checkout.sessions.list({
      payment_intent: order.paymentIntentId,
      limit: 1,
    });

    const session = sessions.data[0];

    if (session && session.payment_status === "paid") {
      order.isPaid = true;
      order.paymentStatus = "Paid";
      await order.save();

      return res.status(200).json({ success: true, message: "Payment verified" });
    }

    return res.status(400).json({ success: false, message: "Payment not completed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ---------------------------------------------------------
    GET USER ORDERS
--------------------------------------------------------- */
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({userId: req.user._id,})

      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* ---------------------------------------------------------
    ADMIN — GET ALL ORDERS
--------------------------------------------------------- */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

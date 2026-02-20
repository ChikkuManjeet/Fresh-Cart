// backend/middlewares/authUser.js

import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; // Make sure this path is correct

export const authUser = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token || req.cookies.userToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user from DB without password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // Attach full user object to req.user
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
};

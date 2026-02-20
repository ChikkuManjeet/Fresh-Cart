import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    // Read the token from cookie
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided", success: false });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach seller info to request for use in protected routes
    req.seller = decoded;

    next();
  } catch (error) {
    console.error("authSeller middleware error:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid or expired token", success: false });
  }
};

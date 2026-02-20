import jwt from 'jsonwebtoken';

//seller login : /api/seller/login
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields", success:false });
        }
        if (email !== process.env.SELLER_EMAIL || password !== process.env.SELLER_PASSWORD) {
            return res.status(400).json({ message: "Invalid email or password", success:false });
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("sellerToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV ==="production" ? "none" : "Strict", maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: "Login successfully", success:true });
    } catch (error) {
        console.log("Error in sellerLogin",error);
        res.status(500).json({ message: "Server Error" });
    }
}

//logout seller : /api/seller/logout
export const logoutSeller = (req, res) => {
    try {
        res.clearCookie("sellerToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV ==="production" ? "none" : "Strict" });
        res.status(200).json({ message: " Logout successfully", success:true });
    } catch (error) {
        console.error("error in sellerLogout",error);
        res.status(500).json({ message: "Server Error" });
    }   
}

// check seller auth : /api/seller/is-auth 
export const isAuthSeller = async (req, res) => {
  try {
    if (!req.seller) {
      return res.json({ success: false, message: "Not authenticated" });
    }

    res.json({
      success: true,
      seller: req.seller,
    });
  } catch (error) {
    console.error("isAuthSeller error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
import User from "../models/user.model.js";

// Update user cart — POST /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user._id; // from authUser middleware
    const { cartItems } = req.body;

    if (!cartItems) {
      return res
        .status(400)
        .json({ message: "Cart items are required", success: false });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cartData: updatedUser.cartItems,
      success: true,
    });
  } catch (error) {
    console.error("Cart update error:", error);
    res
      .status(500)
      .json({ message: "Server Error", success: false, error: error.message });
  }
};

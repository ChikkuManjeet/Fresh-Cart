import Address from "../models/address.model.js";

// Add address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const userId = req.user._id;  // ✅ FIXED
        const { address } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User ID missing", success: false });
        }

        await Address.create({
            ...address,
            userId
        });

        res.status(201).json({
            message: "Address added successfully",
            success: true
        });
    } catch (error) {
        console.error("Error adding address", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get address : /api/address/get
export const getAddress = async (req, res) => {
    try {
        const userId = req.user._id;  // ✅ FIXED

        if (!userId) {
            return res.status(400).json({ message: "User ID missing", success: false });
        }

        const addresses = await Address
            .find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            addresses
        });
    } catch (error) {
        console.error("Error fetching address", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

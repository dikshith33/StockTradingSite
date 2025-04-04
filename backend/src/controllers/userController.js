import User from "../models/User.js";

export const getUserBalance = async (req, res) => {
  console.log("📥 GET /user/balance/:userId hit!"); // Debugging log
  console.log("🔹 Received userId:", req.params.userId);

  try {
    const { userId } = req.params; // ✅ Extract userId from params

    const user = await User.findByPk(userId, {
      attributes: ["balance"], // Fetch only balance
    });

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User balance:", user.balance);
    res.json({ balance: user.balance });
  } catch (error) {
    console.error("❌ Error fetching balance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


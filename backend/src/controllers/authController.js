import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = await User.create({ name, email, password });
    console.log("✅ User created:", user);

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Directly compare the password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Store user ID in response (since you're not using JWT)
    res.json({ message: "Login successful", userId: user.id });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

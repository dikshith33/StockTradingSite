import Stock from "../models/Stock.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import sequelize from "../config/db.js";

// ✅ Buy a Stock
export const buyStock = async (req, res) => {
  const { userId, symbol, name, quantity, price } = req.body;

  if (!userId || !symbol || !quantity || !price) {
    return res.status(400).json({ error: "Missing required stock details" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const totalCost = parseFloat(price) * parseInt(quantity);
    if (parseFloat(user.balance) < totalCost) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const [stock, created] = await Stock.findOrCreate({
      where: { userId, symbol },
      defaults: { name, quantity, averagePrice: price },
    });

    if (!created) {
      const totalQuantity = stock.quantity + quantity;
      stock.averagePrice =
        (stock.averagePrice * stock.quantity + price * quantity) / totalQuantity;
      stock.quantity = totalQuantity;
      await stock.save();
    }

    // Deduct balance
    user.balance = parseFloat(user.balance) - totalCost;
    await user.save();

    // Record transaction
    await Transaction.create({ userId, stockSymbol: symbol, quantity, price, type: "BUY" });

    res.json({ message: "Stock purchased successfully", stock });
  } catch (error) {
    console.error("❌ Error buying stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Sell a Stock (Fixed Balance Update)
export const sellStock = async (req, res) => {
  const { userId, symbol, quantity, price } = req.body;

  if (!userId || !symbol || !quantity || !price) {
    return res.status(400).json({ error: "Missing required stock details" });
  }

  try {
    const stock = await Stock.findOne({ where: { userId, symbol } });

    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({ error: "Not enough stock to sell" });
    }

    stock.quantity -= quantity;
    if (stock.quantity === 0) {
      await stock.destroy();
    } else {
      await stock.save();
    }

    const user = await User.findByPk(userId);
    const totalEarnings = parseFloat(price) * parseInt(quantity);

    console.log("🔍 Current Balance:", user.balance);
    console.log("🔍 Price:", price);
    console.log("🔍 Quantity:", quantity);
    console.log("✅ New Balance:", parseFloat(user.balance) + totalEarnings);

    user.balance = parseFloat(user.balance) + totalEarnings;
    await user.save();

    // Record transaction
    await Transaction.create({ userId, stockSymbol: symbol, quantity, price, type: "SELL" });

    res.json({ message: "Stock sold successfully", stock });
  } catch (error) {
    console.error("❌ Error selling stock:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get User Portfolio
export const getPortfolio = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const stocks = await Stock.findAll({ where: { userId } });
    res.json(stocks);
  } catch (error) {
    console.error("❌ Error fetching portfolio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get User Transactions
export const getTransactions = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID required" });
  }

  try {
    const transactions = await Transaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(transactions);
  } catch (error) {
    console.error("❌ Error fetching transactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

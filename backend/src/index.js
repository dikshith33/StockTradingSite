import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; 

import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/user", userRoutes); 

sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database connected & synced"))
  .catch((err) => console.error("❌ Database sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

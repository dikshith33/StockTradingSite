import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js"; // ✅ Import User model

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.UUID, // ✅ UUID instead of SERIAL
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID, // ✅ Match User model type
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  stockSymbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("BUY", "SELL"),
    allowNull: false,
  },
});

export default Transaction;

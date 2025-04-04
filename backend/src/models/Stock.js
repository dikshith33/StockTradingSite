import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; 


const Stock = sequelize.define("Stock", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  averagePrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Stock;

import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config({ path: "../.env" }); // Load environment variables

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS?.toString(), // Ensure password is a string
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Error connecting to database:", err));

export default sequelize; // ✅ Export as ES Module

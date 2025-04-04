import express from "express";
import { getUserBalance } from "../controllers/userController.js";

const router = express.Router();

// ✅ Use `:userId` as a route parameter
router.get("/balance/:userId", getUserBalance);

export default router;

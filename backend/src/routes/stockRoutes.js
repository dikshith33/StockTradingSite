import express from "express";
import { buyStock, sellStock, getPortfolio } from "../controllers/stockController.js";

const router = express.Router();

router.post("/buy", buyStock); // No auth middleware
router.post("/sell", sellStock);
router.get("/portfolio", getPortfolio);

export default router;

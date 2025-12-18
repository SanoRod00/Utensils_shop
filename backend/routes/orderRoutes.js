import express from "express";
import { listOrders, placeOrder } from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/", listOrders);
router.post("/", placeOrder);

export default router;

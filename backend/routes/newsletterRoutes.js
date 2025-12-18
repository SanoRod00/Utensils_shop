import express from "express";
import { subscribe, listSubscribers } from "../controllers/newsletterController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", subscribe);
router.get("/", authenticate, requireAdmin, listSubscribers);

export default router;

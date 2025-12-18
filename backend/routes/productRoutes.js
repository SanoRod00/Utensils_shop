import express from "express";
import multer from "multer";
import {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories
} from "../controllers/productController.js";
import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", listProducts);
router.get("/categories", listCategories);
router.get("/:id", getProduct);

router.post("/", authenticate, requireAdmin, upload.single("image"), createProduct);
router.put("/:id", authenticate, requireAdmin, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, requireAdmin, deleteProduct);

export default router;

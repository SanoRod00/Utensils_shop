import { v4 as uuidv4 } from "uuid";
import { products } from "../data/products.js";

const orders = [];

export const placeOrder = (req, res) => {
  const { items, total, paymentMethod } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "No items to place order" });
  }

  const normalized = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, productName: product?.name || "Unknown" };
  });

  const order = {
    id: uuidv4(),
    userId: req.user.id,
    paymentMethod: paymentMethod || "card",
    total,
    items: normalized,
    status: "processing",
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
};

export const listOrders = (req, res) => {
  const userOrders = orders.filter((o) => o.userId === req.user.id || req.user.role === "admin");
  res.json(userOrders);
};

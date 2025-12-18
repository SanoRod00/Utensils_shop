import { products } from "../data/products.js";

const carts = new Map(); // userId -> [{productId, quantity}]

const getCartForUser = (userId) => {
  if (!carts.has(userId)) carts.set(userId, []);
  return carts.get(userId);
};

export const getCart = (req, res) => {
  const items = getCartForUser(req.user.id);
  const detailed = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  });
  res.json({ items: detailed });
};

export const addToCart = (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const cart = getCartForUser(req.user.id);
  const existing = cart.find((c) => c.productId === productId);
  if (existing) existing.quantity += Number(quantity);
  else cart.push({ productId, quantity: Number(quantity) });

  res.status(201).json({ message: "Added to cart" });
};

export const updateCartItem = (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;
  const cart = getCartForUser(req.user.id);
  const item = cart.find((c) => c.productId === productId);
  if (!item) return res.status(404).json({ message: "Item not found in cart" });
  item.quantity = Number(quantity);
  res.json({ message: "Cart updated" });
};

export const removeFromCart = (req, res) => {
  const { productId } = req.params;
  const cart = getCartForUser(req.user.id);
  const filtered = cart.filter((c) => c.productId !== productId);
  carts.set(req.user.id, filtered);
  res.json({ message: "Removed from cart" });
};

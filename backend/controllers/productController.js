import { products as productSeed, categories } from "../data/products.js";
import { v4 as uuidv4 } from "uuid";

let products = [...productSeed];

export const listProducts = (req, res) => {
  const { category, q } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );
  }

  res.json({ data: filtered, count: filtered.length });
};

export const getProduct = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProduct = (req, res) => {
  const { name, description, price, discount = 0, category, stock = 0, rating = 0 } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: "Missing required product fields" });
  }

  const newProduct = {
    id: `ut-${uuidv4().slice(0, 6)}`,
    name,
    description,
    price: Number(price),
    discount: Number(discount),
    category,
    stock: Number(stock),
    rating: Number(rating) || 0,
    reviews: 0,
    image: req.file
      ? `/uploads/${req.file.filename}`
      : "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  };

  products.unshift(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const updates = req.body;
  Object.assign(product, updates);
  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
  }
  res.json(product);
};

export const deleteProduct = (req, res) => {
  const initialLength = products.length;
  products = products.filter((p) => p.id !== req.params.id);
  if (products.length === initialLength) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
};

export const listCategories = (req, res) => {
  res.json(categories);
};

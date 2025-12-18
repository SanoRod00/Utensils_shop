import bcrypt from "bcryptjs";
import { users } from "../data/users.js";
import { issueToken } from "../middleware/authMiddleware.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, "..", "data", "users.json");

const ensureUsersDir = () => {
  const dir = path.dirname(usersFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Load users from file or initialize with default users
const loadUsers = () => {
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath, "utf8");
      return JSON.parse(data);
    } else {
      // Initialize with default users
      ensureUsersDir();
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      return [...users];
    }
  } catch (error) {
    console.error("Error loading users:", error);
    return [...users];
  }
};

// Save users to file
const saveUsers = (userList) => {
  try {
    ensureUsersDir();
    fs.writeFileSync(usersFilePath, JSON.stringify(userList, null, 2));
  } catch (error) {
    console.error("Error saving users:", error);
  }
};

let userStore = loadUsers();

export const signup = (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password?.trim();

  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const existing = userStore.find((u) => u.email === email);
  if (existing) return res.status(409).json({ message: "Email already registered" });

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = { id: uuidv4(), name, email, password: hashed, role: "customer" };
  userStore.push(newUser);
  saveUsers(userStore);

  const token = issueToken({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name });
  res.status(201).json({ token, user: { id: newUser.id, name, email, role: newUser.role } });
};

export const login = (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

  const user = userStore.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const token = issueToken({ id: user.id, email: user.email, role: user.role, name: user.name });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
};

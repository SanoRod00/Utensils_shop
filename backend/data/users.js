import bcrypt from "bcryptjs";

const passwordHash = bcrypt.hashSync("cookbetter", 10);

export const users = [
  {
    id: "user-1",
    name: "Ava Stone",
    email: "ava@example.com",
    password: passwordHash,
    role: "customer"
  },
  {
    id: "admin-1",
    name: "Admin Baker",
    email: "admin@utensils.shop",
    password: passwordHash,
    role: "admin"
  }
];

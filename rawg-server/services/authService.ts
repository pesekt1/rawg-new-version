import { AppDataSource } from "../startup/data-source";
import { AdminUser } from "../entities/AdminUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const adminUserRepository = AppDataSource.getRepository(AdminUser);

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const register = async (username: string, password: string) => {
  const existing = await adminUserRepository.findOneBy({ username });
  if (existing) throw new Error("Username already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = adminUserRepository.create({ username, passwordHash });
  await adminUserRepository.save(user);
  return { id: user.id, username: user.username };
};

export const login = async (username: string, password: string) => {
  const user = await adminUserRepository.findOneBy({ username });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return { token };
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

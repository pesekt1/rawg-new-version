import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/authService";

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).send({ error: "Missing or invalid token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) {
    res.status(401).send({ error: "Invalid or expired token" });
    return;
  }
  // Optionally attach user info to req
  (req as any).admin = payload;
  next();
};

import { Request, Response, NextFunction, RequestHandler } from "express";
import { verifyToken } from "../services/authService";

// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

export const requireAdmin: RequestHandler = (
  req: AuthenticatedRequest,
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

  // Ensure payload is an object and has a role property
  if (
    !payload ||
    typeof payload !== "object" ||
    Array.isArray(payload) ||
    !(payload as any).role
  ) {
    res.status(401).send({ error: "Invalid or expired token" });
    return;
  }

  // Attach user info to req
  req.user = payload as { role: string };

  if (!req.user || req.user.role !== "admin") {
    res.status(403).send({ error: "Admin access required." });
    return;
  }
  next();
};

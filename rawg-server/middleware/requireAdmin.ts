import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthService } from "../services/authService";

/**
 * Extends Express Request to include an optional user object with a role.
 */
interface AuthenticatedRequest extends Request {
  user?: { role: string };
}

/**
 * Middleware to require admin access.
 * - Verifies Bearer token from Authorization header.
 * - Checks for a valid user role of 'admin'.
 * - Attaches user info to the request object.
 * - Responds with 401 if token is missing/invalid, 403 if not admin.
 */
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
  const payload = AuthService.verifyToken(token);

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

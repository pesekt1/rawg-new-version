/**
 * expressAuthentication is used by tsoa to secure endpoints.
 * It verifies the Bearer token and checks for admin role when "admin" security is required.
 * Throws an error if authentication or authorization fails.
 */

import { AuthService } from "../services/authService";
import { JwtPayload } from "jsonwebtoken";

/**
 * Middleware for tsoa security integration.
 * @param request The Express request object.
 * @param securityName The security scheme name (e.g., "admin", "jwt").
 * @param scopes Optional scopes (unused).
 * @returns The decoded token payload if authentication succeeds.
 * @throws Error if authentication or authorization fails.
 */
export async function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  const authHeader = request.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("No or invalid Authorization header");
  }

  const token = authHeader.split(" ")[1];
  let payload: string | JwtPayload;
  try {
    payload = AuthService.verifyToken(token); // Decode the JWT token
  } catch (err) {
    throw new Error("Invalid token");
  }

  if (securityName === "admin") {
    if (
      !payload ||
      typeof payload !== "object" ||
      !("role" in payload) ||
      payload.role !== "admin"
    ) {
      throw new Error("Not authorized as admin");
    }
  } else if (securityName !== "jwt") {
    throw new Error("Unknown security scheme");
  }

  request.user = payload; // Attach the decoded payload to req.user
  return payload;
}

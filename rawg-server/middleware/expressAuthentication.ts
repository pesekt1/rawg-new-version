/**
 * expressAuthentication is used by tsoa to secure endpoints.
 * It verifies the Bearer token and checks for admin role when "admin" security is required.
 * Throws an error if authentication or authorization fails.
 */

import { AuthService } from "../services/authService";

/**
 * Middleware for tsoa security integration.
 * @param request The Express request object.
 * @param securityName The security scheme name (e.g., "admin").
 * @param scopes Optional scopes (unused).
 * @returns The decoded token payload if authentication succeeds.
 * @throws Error if authentication or authorization fails.
 */
export async function expressAuthentication(
  request: any,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "admin") {
    const authHeader = request.headers["authorization"];
    if (!authHeader?.startsWith("Bearer ")) {
      throw new Error("No or invalid Authorization header");
    }
    const token = authHeader.split(" ")[1];
    const payload = AuthService.verifyToken(token);

    // Type guard: ensure payload is an object and has a role property
    if (
      !payload ||
      typeof payload !== "object" ||
      Array.isArray(payload) ||
      !(payload as any).role
    ) {
      throw new Error("Not authorized as admin");
    }
    if ((payload as any).role !== "admin") {
      throw new Error("Not authorized as admin");
    }
    return payload;
  }
  throw new Error("Unknown security scheme");
}

/**
 * expressAuthentication is used by tsoa to secure endpoints.
 * It verifies the Bearer token and checks for admin role when "admin" security is required.
 * Throws an error if authentication or authorization fails.
 */

import { AuthService } from "../services/authService";
import jwt from "jsonwebtoken";

/**
 * Helper function to extract and verify the JWT token.
 * @param request The Express request object.
 * @returns The decoded token payload.
 * @throws Error if the token is missing or invalid.
 */
function extractAndVerifyToken(request: any): any {
  const authHeader = request.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("No or invalid Authorization header");
  }
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    throw new Error("Invalid token");
  }
}

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
  const payload = extractAndVerifyToken(request);

  //handle admin and normal user security
  if (securityName === "admin") {
    // Ensure the payload contains a role and it is "admin"
    if (
      !payload ||
      typeof payload !== "object" ||
      (payload as any).role !== "admin"
    ) {
      throw new Error("Not authorized as admin");
    }
  } else if (securityName !== "jwt") {
    throw new Error("Unknown security scheme");
  }

  return payload; // Return the decoded token payload
}

import { AuthService } from "../services/authService";

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

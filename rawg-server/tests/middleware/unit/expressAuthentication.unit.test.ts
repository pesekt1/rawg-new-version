import { describe, it, expect, vi } from "vitest";
import { expressAuthentication } from "../../../middleware/expressAuthentication";
import { AuthService } from "../../../services/authService";

vi.mock("../../../services/authService");

describe("expressAuthentication middleware (unit)", () => {
  it("should throw an error if no Authorization header is provided", async () => {
    const request = { headers: {} } as any;
    await expect(expressAuthentication(request, "admin")).rejects.toThrow(
      "No or invalid Authorization header"
    );
  });

  it("should throw an error if the token is invalid", async () => {
    const request = {
      headers: { authorization: "Bearer invalidtoken" },
    } as any;
    (AuthService.verifyToken as any).mockReturnValue(null);

    await expect(expressAuthentication(request, "admin")).rejects.toThrow(
      "Not authorized as admin"
    );
  });

  it("should throw an error if the user is not an admin", async () => {
    const request = { headers: { authorization: "Bearer validtoken" } } as any;
    (AuthService.verifyToken as any).mockReturnValue({ role: "user" });

    await expect(expressAuthentication(request, "admin")).rejects.toThrow(
      "Not authorized as admin"
    );
  });

  it("should return the payload if the user is an admin", async () => {
    const request = { headers: { authorization: "Bearer validtoken" } } as any;
    const payload = { role: "admin", userId: 1 };
    (AuthService.verifyToken as any).mockReturnValue(payload);

    const result = await expressAuthentication(request, "admin");
    expect(result).toEqual(payload);
  });
});

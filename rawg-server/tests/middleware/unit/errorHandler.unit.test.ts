import { describe, it, expect, vi } from "vitest";
import { errorHandler } from "../../../middleware/errorHandler";

describe("errorHandler middleware (unit)", () => {
  it("should handle custom error with status and message", () => {
    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();

    const error = { status: 400, message: "Test error" };
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Test error" });
  });

  it("should handle generic error with default status and message", () => {
    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any;
    const next = vi.fn();

    const error = new Error("Generic error");
    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });
});

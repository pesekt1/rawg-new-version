import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import express from "express";
import { expressAuthentication } from "../../../middleware/expressAuthentication";
import { AuthService } from "../../../services/authService";

vi.mock("../../../services/authService");

function createApp() {
  const app = express();
  app.use(async (req, res, next) => {
    try {
      req.user = await expressAuthentication(req, "admin");
      next();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      res.status(401).json({ error: errorMessage });
    }
  });
  app.get("/protected", (req, res) => {
    res.json({ message: "Access granted", user: req.user });
  });
  return app;
}

describe("expressAuthentication middleware (integration)", () => {
  it("should return 401 if no Authorization header is provided", async () => {
    const app = createApp();
    const res = await request(app).get("/protected");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "No or invalid Authorization header" });
  });

  it("should return 401 if the token is invalid", async () => {
    (AuthService.verifyToken as any).mockImplementation(() => {
      throw new Error("Invalid token");
    });
    const app = createApp();
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Invalid token" });
  });

  it("should return 401 if the user is not an admin", async () => {
    (AuthService.verifyToken as any).mockReturnValue({ role: "user" });
    const app = createApp();
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Not authorized as admin" });
  });

  it("should return 200 and grant access if the user is an admin", async () => {
    (AuthService.verifyToken as any).mockReturnValue({
      role: "admin",
      userId: 1,
    });
    const app = createApp();
    const res = await request(app)
      .get("/protected")
      .set("Authorization", "Bearer validtoken");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "Access granted",
      user: { role: "admin", userId: 1 },
    });
  });
});

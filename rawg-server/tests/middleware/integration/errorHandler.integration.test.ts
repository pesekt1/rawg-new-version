import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { errorHandler } from "../../../middleware/errorHandler";

function createAppWithErrorHandler() {
  const app = express();
  app.get("/error", (req, res, next) => {
    const error = new Error("Test error");
    (error as any).status = 400;
    next(error);
  });
  app.get("/generic-error", (req, res, next) => {
    next(new Error("Generic error"));
  });
  app.use(errorHandler);
  return app;
}

describe("errorHandler middleware", () => {
  it("should handle custom error with status and message", async () => {
    const app = createAppWithErrorHandler();
    const res = await request(app).get("/error");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Test error" });
  });

  it("should handle generic error with default status and message", async () => {
    const app = createAppWithErrorHandler();
    const res = await request(app).get("/generic-error");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});

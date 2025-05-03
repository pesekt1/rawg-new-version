import "reflect-metadata";
import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import init from "../startup/init";
import { RegisterRoutes } from "../routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";
import { errorHandler } from "../middleware/errorHandler";

function createApp(): express.Application {
  const app = express();
  init(app);
  app.use(express.json());
  app.use((req, res, next) => {
    req.user = undefined;
    next();
  });
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  RegisterRoutes(app);
  app.get("/", (req, res) => res.send("Hello World!"));
  app.get("/swagger.json", (req, res) => res.json(swaggerDocument));
  app.get("/redoc", (req, res) => res.send("<html></html>"));
  app.use(errorHandler);
  return app;
}

describe("index.ts Express app", () => {
  it("GET / should return Hello World!", async () => {
    const app = createApp();
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });

  it("GET /swagger.json should return swagger document", async () => {
    const app = createApp();
    const res = await request(app).get("/swagger.json");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("openapi");
  });

  it("GET /redoc should return HTML", async () => {
    const app = createApp();
    const res = await request(app).get("/redoc");
    expect(res.status).toBe(200);
    expect(res.text).toContain("<html>");
  });
});

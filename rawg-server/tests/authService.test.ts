import "dotenv/config"; // Ensure .env variables are loaded

process.env.JWT_SECRET = "test_secret";

import "reflect-metadata";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock repository and dependencies
const mockRepo = {
  findOneBy: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
};

const user = {
  id: 1,
  username: "user",
  passwordHash: "hash",
  role: "user",
};

// Mock AppDataSource.getRepository before importing AuthService
vi.mock("../startup/data-source", () => ({
  AppDataSource: {
    getRepository: () => mockRepo,
  },
}));

vi.mock("bcryptjs");
vi.mock("jsonwebtoken");

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthService } from "../services/authService";

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a new user", async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    mockRepo.create.mockReturnValue(user);
    mockRepo.save.mockResolvedValue(user); // even though return value isn't used
    (bcrypt.hash as any).mockResolvedValue("hash");
    (jwt.sign as any).mockReturnValue("token");

    const result = await AuthService.register("user", "pass");
    expect(result).toEqual({
      token: "token",
      user,
    });
  });

  it("throws if username exists", async () => {
    mockRepo.findOneBy.mockResolvedValue({ username: "user" });
    await expect(AuthService.register("user", "pass")).rejects.toThrow(
      "Username already exists"
    );
  });

  it("logs in with valid credentials", async () => {
    mockRepo.findOneBy.mockResolvedValue({
      id: 1,
      username: "user",
      passwordHash: "hash",
      role: "user",
    });
    (bcrypt.compare as any).mockResolvedValue(true);
    (jwt.sign as any).mockReturnValue("token");

    const result = await AuthService.login("user", "pass");
    expect(result).toEqual({
      token: "token",
      user: user,
    });
  });

  it("throws on invalid login credentials", async () => {
    mockRepo.findOneBy.mockResolvedValue(null);
    await expect(AuthService.login("user", "pass")).rejects.toThrow(
      "Invalid credentials"
    );
  });

  it("throws an error for invalid token", () => {
    (jwt.verify as any).mockImplementation(() => {
      throw new Error("Invalid or expired token");
    });
    expect(() => AuthService.verifyToken("badtoken")).toThrow(
      "Invalid or expired token"
    );
  });

  it("returns payload for valid token", () => {
    (jwt.verify as any).mockReturnValue({ userId: 1 });
    expect(AuthService.verifyToken("goodtoken")).toEqual({ userId: 1 });
  });
});

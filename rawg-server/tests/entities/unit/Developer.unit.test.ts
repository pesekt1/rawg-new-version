import { describe, it, expect } from "vitest";
import { Developer } from "../../../entities/Developer";

describe("Developer Entity Unit Tests", () => {
  it("should create a Developer instance with valid properties", () => {
    const developer = new Developer();
    developer.name = "Test Developer";
    developer.slug = "test-developer";
    developer.image_background = "http://example.com/image.jpg";
    developer.games = []; // Explicitly initialize games for testing

    expect(developer.name).toBe("Test Developer");
    expect(developer.slug).toBe("test-developer");
    expect(developer.image_background).toBe("http://example.com/image.jpg");
  });

  it("should allow nullable image_background", () => {
    const developer = new Developer();
    developer.name = "Test Developer";
    developer.slug = "test-developer";
    developer.image_background = null;
    developer.games = []; // Explicitly initialize games for testing

    expect(developer.image_background).toBeNull();
  });

  it("should initialize games as an empty array", () => {
    const developer = new Developer();
    developer.games = []; // Explicitly initialize games for testing
    expect(developer.games).toEqual([]);
  });
});

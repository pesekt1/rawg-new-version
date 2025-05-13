import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { QueryFailedError } from "typeorm";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Developer } from "../../../entities/Developer";
import { Game } from "../../../entities/Game";
import { Genre } from "../../../entities/Genre";
import { ParentPlatform } from "../../../entities/ParentPlatform";
import { Store } from "../../../entities/Store";
import { Publisher } from "../../../entities/Publisher";
import { Trailer } from "../../../entities/Trailer";
import { Screenshot } from "../../../entities/Screenshot";
import { User } from "../../../entities/User";
import { Tag } from "../../../entities/Tag";

let dataSource: DataSource;

beforeAll(async () => {
  // Create a temporary connection to MySQL to drop and recreate the test database
  const tempDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3307", 10), // Match Docker's exposed port
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "rootpassword", // Match Docker's root password
  });

  await tempDataSource.initialize();
  await tempDataSource.query(`DROP DATABASE IF EXISTS testdb`); // Drop the test database
  await tempDataSource.query(`CREATE DATABASE testdb`); // Recreate the test database
  await tempDataSource.destroy();

  // Initialize the main data source for the tests
  dataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3307", 10),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "rootpassword",
    database: process.env.DB_NAME || "testdb", // Use the test database
    synchronize: true, // Synchronize the schema
    entities: [
      Developer,
      Game,
      Genre,
      ParentPlatform,
      Store,
      Publisher,
      Trailer,
      Screenshot,
      User,
      Tag,
    ], // Include all related entities
  });

  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

beforeEach(async () => {
  // Disable foreign key checks
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

  // Clean the database by truncating all tables
  const entities = dataSource.entityMetadatas;
  for (const entity of entities) {
    const repository = dataSource.getRepository(entity.name);
    await repository.clear(); // Truncate the table
  }

  // Re-enable foreign key checks
  await dataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
});

describe("Developer Entity Integration Tests", () => {
  it("should save and retrieve a Developer entity with image_background", async () => {
    const repo = dataSource.getRepository(Developer);

    const developer = repo.create({
      name: "Test Developer",
      slug: "test-developer",
      image_background: "http://example.com/image.jpg",
    });
    await repo.save(developer);

    const savedDeveloper = await repo.findOne({
      where: { slug: "test-developer" },
      relations: ["games"], // Ensure games relation is loaded
    });
    expect(savedDeveloper).toBeDefined();
    expect(savedDeveloper?.name).toBe("Test Developer");
    expect(savedDeveloper?.slug).toBe("test-developer");
    expect(savedDeveloper?.image_background).toBe(
      "http://example.com/image.jpg"
    );
  });

  it("should save and retrieve a Developer entity without image_background", async () => {
    const repo = dataSource.getRepository(Developer);

    const developer = repo.create({
      name: "Test Developer 2",
      slug: "test-developer-2",
    });
    await repo.save(developer);

    const savedDeveloper = await repo.findOne({
      where: { slug: "test-developer-2" },
      relations: ["games"], // Ensure games relation is loaded
    });
    expect(savedDeveloper).toBeDefined();
    expect(savedDeveloper?.name).toBe("Test Developer 2");
    expect(savedDeveloper?.slug).toBe("test-developer-2");
    expect(savedDeveloper?.image_background).toBeNull();
  });

  it("should handle relationships with Game entities", async () => {
    const developerRepo = dataSource.getRepository(Developer);
    const gameRepo = dataSource.getRepository(Game);

    const game = gameRepo.create({
      name: "Test Game",
      slug: "test-game",
      description_raw: "A test game description",
      metacritic: 85,
      background_image: "http://example.com/game.jpg",
      rating: 4.5,
      released: "2023-01-01",
    });
    await gameRepo.save(game);

    const developer = developerRepo.create({
      name: "Test Developer",
      slug: "test-developer-relationship",
      games: [game], // Associate the game with the developer
    });
    await developerRepo.save(developer);

    const savedDeveloper = await developerRepo.findOne({
      where: { slug: "test-developer-relationship" },
      relations: ["games"], // Ensure games relation is loaded
    });

    expect(savedDeveloper).toBeDefined();
    expect(savedDeveloper?.name).toBe("Test Developer");
    expect(savedDeveloper?.slug).toBe("test-developer-relationship");
    expect(savedDeveloper?.games).toHaveLength(1);
    expect(savedDeveloper?.games[0].name).toBe("Test Game");
    expect(savedDeveloper?.games[0].slug).toBe("test-game");
    expect(savedDeveloper?.games[0].description_raw).toBe(
      "A test game description"
    );
  });

  it("should throw an error for duplicate slugs", async () => {
    const repo = dataSource.getRepository(Developer);

    const developer1 = repo.create({
      name: "Developer 1",
      slug: "duplicate-slug",
    });
    await repo.save(developer1);

    const developer2 = repo.create({
      name: "Developer 2",
      slug: "duplicate-slug",
    });

    await expect(repo.save(developer2)).rejects.toThrow(QueryFailedError); // Expect a QueryFailedError for duplicate slug
  });
});

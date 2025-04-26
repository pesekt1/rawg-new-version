import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";
import { Publisher } from "./entities/Publisher";
import { Trailer } from "./entities/Trailer";
import { Screenshot } from "./entities/Screenshot";
import { truncateAllTables } from "./utils/truncateAllTables";
import { seedUser } from "./utils/seedUser";
import { seedGames } from "./utils/seedGames";

//We need this because the original data has a different structure
type GameOriginal = Omit<Game, "parent_platforms" | "stores"> & {
  parent_platforms: { platform: ParentPlatform }[];
  stores: { store: Store }[];
};

async function insertData() {
  await AppDataSource.initialize(); //initialize connection

  await truncateAllTables(AppDataSource);
  await seedUser(AppDataSource); // <-- call the imported utility

  //get data from games.json and parse it.
  const rawData = fs.readFileSync("games.json", "utf-8");
  const parsedData = JSON.parse(rawData);
  const gamesOriginalData: GameOriginal[] = parsedData.results;
  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((p) => p.platform),
    stores: game.stores.map((s) => s.store),
  }));

  //create repository instances for CRUD operations on entities
  const gameRepo = AppDataSource.getRepository(Game);
  const genreRepo = AppDataSource.getRepository(Genre);
  const platformRepo = AppDataSource.getRepository(ParentPlatform);
  const storeRepo = AppDataSource.getRepository(Store);
  const publisherRepo = AppDataSource.getRepository(Publisher);
  const trailerRepo = AppDataSource.getRepository(Trailer);
  const screenshotRepo = AppDataSource.getRepository(Screenshot);

  await seedGames(
    gamesData,
    gameRepo,
    genreRepo,
    platformRepo,
    storeRepo,
    publisherRepo,
    trailerRepo,
    screenshotRepo
  );

  console.log("Seeding completed successfully.");
  //terminate the process
  process.exit();
}

insertData();

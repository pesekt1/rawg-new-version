import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";
import { Publisher } from "./entities/Publisher";
import axios from "axios";

//We need this because the original data has a different structure
type GameOriginal = Omit<Game, "parent_platforms" | "stores"> & {
  parent_platforms: { platform: ParentPlatform }[];
  stores: { store: Store }[];
};

async function fetchDescription(slug: string): Promise<string> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${slug}?key=${apiKey}`
    );
    const description_raw =
      response.data.description_raw || "No description available.";
    return description_raw;
  } catch (error) {
    console.error(`Failed to fetch description for slug: ${slug}`, error);
    return "No description available.";
  }
}

async function fetchPublishers(slug: string): Promise<Publisher[]> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Game>(
      `https://api.rawg.io/api/games/${slug}?key=${apiKey}`
    );
    const publishers = response.data.publishers || [];
    return publishers;
  } catch (error) {
    console.error(`Failed to fetch publishers for slug: ${slug}`, error);
    return [];
  }
}

async function insertData() {
  await AppDataSource.initialize(); //initialize connection

  //get data from games.json and parse it.
  const rawData = fs.readFileSync("games.json", "utf-8");
  const parsedData = JSON.parse(rawData);
  const gamesOriginalData: GameOriginal[] = parsedData.results;

  //transform original data to match our entities
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

  //before inserting data, delete all existing data
  await gameRepo.delete({});
  console.log("Games deleted");
  await genreRepo.delete({});
  console.log("Genres deleted");
  await platformRepo.delete({});
  console.log("Platforms deleted");
  await storeRepo.delete({});
  console.log("Stores deleted");

  //loop through the games and insert data in all tables
  for (const game of gamesData) {
    // Fetch publishers for the current game
    game.publishers = await fetchPublishers(game.slug);

    //check each genre for a game and save it if it doesn't exist
    await Promise.all(
      game.genres.map(async (g) => {
        let genre = await genreRepo.findOne({ where: { id: g.id } });
        if (!genre) {
          genre = await genreRepo.save(g);
          console.log(`Genre ${genre.name} created`);
        }
        return genre;
      })
    );

    // Check each publisher for a game and save it if it doesn't exist
    await Promise.all(
      game.publishers.map(async (pub) => {
        let publisher = await publisherRepo.findOne({ where: { id: pub.id } });
        if (!publisher) {
          publisher = await publisherRepo.save(pub);
          console.log(`Publisher ${publisher.name} created`);
        }
        return publisher;
      })
    );

    //check each store for a game and save it if it doesn't exist
    await Promise.all(
      game.stores.map(async (s) => {
        let store = await storeRepo.findOne({ where: { id: s.id } });
        if (!store) {
          store = await storeRepo.save(s);
          console.log(`Store ${store.name} created`);
        }
        return store;
      })
    );

    //check each platform for a game and save it if it doesn't exist
    await Promise.all(
      game.parent_platforms.map(async (p) => {
        let platform = await platformRepo.findOne({ where: { id: p.id } });
        if (!platform) {
          platform = await platformRepo.save(p);
          console.log(`Platform ${platform.name} created`);
        }
        return platform;
      })
    );

    game.description_raw = await fetchDescription(game.slug);

    //save the game - this will also save the relationships in the join tables
    await gameRepo.save(game);
    console.log(`Game ${game.name} created`);
  }

  //terminate the process
  process.exit();
}

insertData();

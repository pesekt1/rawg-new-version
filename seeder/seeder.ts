import { AppDataSource } from "./data-source";
import * as fs from "fs";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";
import { Publisher } from "./entities/Publisher";
import axios from "axios";
import { Trailer } from "./entities/Trailer";
import { Repository } from "typeorm";
import { Screenshot } from "./entities/Screenshot";
import { truncateAllTables } from "./utils/truncateAllTables";
import { seedUser } from "./utils/seedUser";

interface Response<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface TrailerOriginal {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}

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

async function fetchTrailers(
  gameId: number,
  trailerRepo: Repository<Trailer>
): Promise<Trailer[]> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Response<TrailerOriginal>>(
      `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`
    );
    const trailers = response.data.results || []; // Fallback to an empty array if no results

    // Use TypeORM's create method to ensure proper entity management
    return trailers.map((trailer) =>
      trailerRepo.create({
        id: trailer.id,
        name: trailer.name,
        preview: trailer.preview,
        data480: trailer.data["480"],
        dataMax: trailer.data["max"],
      })
    );
  } catch (error) {
    console.error(`Failed to fetch trailers for game ID: ${gameId}`, error);
    return []; // Return an empty array if the API call fails
  }
}

async function fetchScreenshots(gameId: number): Promise<Screenshot[]> {
  const apiKey = process.env.RAWG_API_KEY;
  try {
    const response = await axios.get<Response<Screenshot>>(
      `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`
    );
    const screenshots = response.data.results || []; // Fallback to an empty array if no results
    return screenshots;
  } catch (error) {
    console.error(`Failed to fetch screenshots for game ID: ${gameId}`, error);
    return []; // Return an empty array if the API call fails
  }
}

async function insertData() {
  await AppDataSource.initialize(); //initialize connection

  await truncateAllTables(AppDataSource);

  await seedUser(AppDataSource); // <-- call the imported utility

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
  const trailerRepo = AppDataSource.getRepository(Trailer);
  const screenshotRepo = AppDataSource.getRepository(Screenshot);

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
    const savedGame = await gameRepo.save(game);
    console.log(`Game ${savedGame.name} created`);

    // Fetch and save trailers for the game
    const trailers = await fetchTrailers(savedGame.id, trailerRepo);
    if (trailers.length > 0) {
      // Assign game to each trailer
      trailers.forEach((trailer) => (trailer.game = savedGame));
      await trailerRepo.save(trailers);
      console.log(
        `${trailers.length} trailers created for game ID ${savedGame.id}`
      );
    }

    // Fetch and save screenshots for the game
    const screenshots = await fetchScreenshots(savedGame.id);
    if (screenshots.length > 0) {
      screenshots.forEach((screenshot) => (screenshot.game = savedGame));
      await screenshotRepo.save(screenshots); // Save screenshots in bulk
      console.log(
        `${screenshots.length} screenshots created for game ID ${savedGame.id}`
      );
    }
  }

  console.log("Seeding completed successfully.");
  //terminate the process
  process.exit();
}

insertData();

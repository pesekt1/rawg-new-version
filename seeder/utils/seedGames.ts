import { DataSource } from "typeorm";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Store } from "../entities/Store";
import { Publisher } from "../entities/Publisher";
import { Trailer } from "../entities/Trailer";
import { Screenshot } from "../entities/Screenshot";
import {
  fetchDescription,
  fetchPublishers,
  fetchTrailers,
  fetchScreenshots,
  fetchGamesPage,
} from "./fetchers";

// Define GameOriginal type for mapping
type GameOriginal = Omit<Game, "parent_platforms" | "stores"> & {
  parent_platforms: { platform: ParentPlatform }[];
  stores: { store: Store }[];
};

export async function seedGames(dataSource: DataSource) {
  const gameRepo = dataSource.getRepository(Game);
  const genreRepo = dataSource.getRepository(Genre);
  const platformRepo = dataSource.getRepository(ParentPlatform);
  const storeRepo = dataSource.getRepository(Store);
  const publisherRepo = dataSource.getRepository(Publisher);
  const trailerRepo = dataSource.getRepository(Trailer);
  const screenshotRepo = dataSource.getRepository(Screenshot);

  // Fetch games from API (first page, 40 games)
  const gamesOriginalData: GameOriginal[] = await fetchGamesPage(1);

  // Map to entity structure
  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((p) => p.platform),
    stores: game.stores.map((s) => s.store),
  }));

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
}

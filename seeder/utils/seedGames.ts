import { DataSource, Repository, ObjectLiteral } from "typeorm";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Store } from "../entities/Store";
import { Publisher } from "../entities/Publisher";
import { Trailer } from "../entities/Trailer";
import { Screenshot } from "../entities/Screenshot";
import { Developer } from "../entities/Developer";
import { Tag } from "../entities/Tag";
import {
  fetchGames,
  fetchAdditionalGameData,
  fetchTrailers,
  fetchScreenshots,
} from "./fetchers";

//number of pages to fetch from the API
const GAME_PAGES = process.env.GAME_PAGES
  ? parseInt(process.env.GAME_PAGES)
  : undefined;

// Generic helper function
async function findOrCreateEntities<T extends ObjectLiteral>(
  repo: Repository<T>,
  entities: T[],
  entityName: string
): Promise<T[]> {
  return Promise.all(
    entities.map(async (e: any) => {
      let found = await repo.findOne({ where: { id: e.id } });
      if (!found) {
        found = await repo.save(e);
        if (!found) {
          throw new Error(`${entityName} could not be saved`);
        }
        console.log(`${entityName} ${found.name} created`);
      }
      return found;
    })
  );
}

export async function seedGames(dataSource: DataSource, gamePages: number) {
  const gameRepo = dataSource.getRepository(Game);
  const genreRepo = dataSource.getRepository(Genre);
  const platformRepo = dataSource.getRepository(ParentPlatform);
  const storeRepo = dataSource.getRepository(Store);
  const publisherRepo = dataSource.getRepository(Publisher);
  const trailerRepo = dataSource.getRepository(Trailer);
  const screenshotRepo = dataSource.getRepository(Screenshot);
  const developerRepo = dataSource.getRepository(Developer);
  const tagRepo = dataSource.getRepository(Tag);

  for (let page = 1; page <= gamePages; page++) {
    console.log(`Seeding games for page ${page}`);
    // Fetch games from API
    const gamesOriginalData = await fetchGames(page);

    // Map to your entity structure
    const gamesData: Game[] = gamesOriginalData.map((game) => ({
      ...game,
      parent_platforms: game.parent_platforms?.map((p) => p.platform) || [],
      stores: game.stores?.map((s) => s.store) || [],
    }));

    for (const game of gamesData) {
      // Fetch additional game data and assign it to the game object
      const { description_raw, publishers, developers, tags, website } =
        await fetchAdditionalGameData(game.slug);
      game.description_raw = description_raw;
      game.publishers = publishers;
      game.developers = developers;
      game.tags = tags;
      game.website = website;

      // Use helper for all entity types
      game.genres = await findOrCreateEntities(genreRepo, game.genres, "Genre");
      game.publishers = await findOrCreateEntities(
        publisherRepo,
        game.publishers,
        "Publisher"
      );
      game.developers = await findOrCreateEntities(
        developerRepo,
        game.developers,
        "Developer"
      );
      game.tags = await findOrCreateEntities(tagRepo, game.tags, "Tag");
      game.stores = await findOrCreateEntities(storeRepo, game.stores, "Store");
      game.parent_platforms = await findOrCreateEntities(
        platformRepo,
        game.parent_platforms,
        "Platform"
      );

      // Save the game with all relationships
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
}

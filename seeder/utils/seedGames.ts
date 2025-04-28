import { DataSource } from "typeorm";
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
  fetchAdditionalGameData, // <-- import the new function
  fetchTrailers,
  fetchScreenshots,
} from "./fetchers";

//number of pages to fetch from the API
const GAME_PAGES = process.env.GAME_PAGES
  ? parseInt(process.env.GAME_PAGES)
  : undefined;

export async function seedGames(dataSource: DataSource) {
  const gameRepo = dataSource.getRepository(Game);
  const genreRepo = dataSource.getRepository(Genre);
  const platformRepo = dataSource.getRepository(ParentPlatform);
  const storeRepo = dataSource.getRepository(Store);
  const publisherRepo = dataSource.getRepository(Publisher);
  const trailerRepo = dataSource.getRepository(Trailer);
  const screenshotRepo = dataSource.getRepository(Screenshot);
  const developerRepo = dataSource.getRepository(Developer);
  const tagRepo = dataSource.getRepository(Tag);

  // Fetch games from API
  const gamesOriginalData = await fetchGames(GAME_PAGES);

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

    // Save genres and assign to game
    game.genres = await Promise.all(
      game.genres.map(async (g) => {
        let genre = await genreRepo.findOne({ where: { id: g.id } });
        if (!genre) {
          genre = await genreRepo.save(g);
          console.log(`Genre ${genre.name} created`);
        }
        return genre;
      })
    );

    // Save publishers and assign to game
    game.publishers = await Promise.all(
      game.publishers.map(async (pub) => {
        let publisher = await publisherRepo.findOne({ where: { id: pub.id } });
        if (!publisher) {
          publisher = await publisherRepo.save(pub);
          console.log(`Publisher ${publisher.name} created`);
        }
        return publisher;
      })
    );

    // Save developers and assign to game
    game.developers = await Promise.all(
      game.developers.map(async (dev) => {
        let developer = await developerRepo.findOne({ where: { id: dev.id } });
        if (!developer) {
          developer = await developerRepo.save(dev);
          console.log(`Developer ${developer.name} created`);
        }
        return developer;
      })
    );

    // Save tags and assign to game
    game.tags = await Promise.all(
      game.tags.map(async (t) => {
        let tag = await tagRepo.findOne({ where: { id: t.id } });
        if (!tag) {
          tag = await tagRepo.save(t);
          console.log(`Tag ${tag.name} created`);
        }
        return tag;
      })
    );

    // Save stores and assign to game
    game.stores = await Promise.all(
      game.stores.map(async (s) => {
        let store = await storeRepo.findOne({ where: { id: s.id } });
        if (!store) {
          store = await storeRepo.save(s);
          console.log(`Store ${store.name} created`);
        }
        return store;
      })
    );

    // Save platforms and assign to game
    game.parent_platforms = await Promise.all(
      game.parent_platforms.map(async (p) => {
        let platform = await platformRepo.findOne({ where: { id: p.id } });
        if (!platform) {
          platform = await platformRepo.save(p);
          console.log(`Platform ${platform.name} created`);
        }
        return platform;
      })
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

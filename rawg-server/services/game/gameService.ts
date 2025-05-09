import { Game } from "../../entities/Game";
import { AppDataSource } from "../../startup/data-source";
import { GameUpdateDto } from "../../controllers/dto/GameUpdateDto";
import { GameReadDto } from "../../controllers/dto/GameReadDto";
import { GameCardDto } from "../../controllers/dto/GameCardDto";
import { toGameCardDto, toGameReadDto } from "../../controllers/dto/entityMappers";
import { Genre } from "../../entities/Genre";
import { ParentPlatform } from "../../entities/ParentPlatform";
import { Store } from "../../entities/Store";
import { Publisher } from "../../entities/Publisher";
import { Developer } from "../../entities/Developer";
import { Tag } from "../../entities/Tag";
import { buildGameQuery } from "./gameQueryBuilder";

export class GameService {
  private gameRepository = AppDataSource.getRepository(Game);

  /**
   * Get a paginated list of games with filters and sorting.
   */
  async getGames(filters: any): Promise<{ count: number; next: string | null; results: GameCardDto[] }> {
    const DEFAULT_PAGE_SIZE = 10;
    const MAX_PAGE_SIZE = 40;
    const DEFAULT_PAGE = 1;

    const page = filters.page ? Number(filters.page) : DEFAULT_PAGE;
    let pageSize = filters.page_size
      ? Number(filters.page_size)
      : DEFAULT_PAGE_SIZE;

    // Enforce maximum page size
    if (pageSize > MAX_PAGE_SIZE) pageSize = MAX_PAGE_SIZE;
    if (pageSize < 1) pageSize = DEFAULT_PAGE_SIZE;

    const queryBuilder = buildGameQuery(filters);
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [games, total] = await queryBuilder.getManyAndCount();
    const results = games.map(toGameCardDto);

    return {
      count: total,
      next:
        total > page * pageSize
          ? `${process.env.SERVER_URL}/games?page=${
              page + 1
            }&page_size=${pageSize}`
          : null,
      results,
    };
  }

  /**
   * Get a single game by ID, including all relations.
   */
  async getGame(id: number): Promise<GameReadDto> {
    const game = await this.gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.parent_platforms", "parent_platforms")
      .leftJoinAndSelect("game.stores", "stores")
      .leftJoinAndSelect("game.publishers", "publishers")
      .leftJoinAndSelect("game.developers", "developers")
      .leftJoinAndSelect("game.tags", "tags")
      .leftJoinAndSelect("game.wishlistedBy", "wishlistedBy")
      .leftJoinAndSelect("game.inLibraryOf", "inLibraryOf")
      .where("game.id = :id", { id })
      .getOne();

    if (!game) {
      throw new Error(`Game with id "${id}" not found`);
    }
    return toGameReadDto(game);
  }

  /**
   * Get trailers for a specific game.
   */
  async getTrailers(gameId: number) {
    const game = await this.gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.trailers", "trailers")
      .where("game.id = :gameId", { gameId })
      .getOne();

    if (!game || !game.trailers) {
      throw new Error(`No trailers found for game with ID "${gameId}"`);
    }

    return {
      count: game.trailers.length,
      results: game.trailers,
    };
  }

  /**
   * Get screenshots for a specific game.
   */
  async getScreenshots(gameId: number) {
    const game = await this.gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.screenshots", "screenshots") // Assuming a relation exists
      .where("game.id = :gameId", { gameId })
      .getOne();

    if (!game || !game.screenshots) {
      throw new Error(`No screenshots found for game with ID "${gameId}"`);
    }

    return {
      count: game.screenshots.length,
      results: game.screenshots,
    };
  }

  /**
   * Create a new game.
   */
  async createGame(data: GameUpdateDto): Promise<GameReadDto> {
    // Validate required fields
    if (!data.name || !data.slug) {
      throw new Error("Missing required fields: name and slug");
    }

    // Unix timestamp in seconds
    const added =
      typeof data.added === "number" ? data.added : Math.floor(Date.now() / 1000);

    // Create and save the game
    const game = this.gameRepository.create({
      ...data,
      added,
    });
    await this.gameRepository.save(game);
    return toGameReadDto(game);
  }

  /**
   * Delete a game by ID.
   */
  async deleteGame(id: number) {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) {
      throw new Error(`Game with id "${id}" not found`);
    }
    await this.gameRepository.remove(game);
  }

  /**
   * Update a game by ID.
   */
  async updateGame(id: number, data: GameUpdateDto): Promise<GameReadDto> {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) throw new Error(`Game with id "${id}" not found`);

    // Update primitive fields
    if (data.name !== undefined) game.name = data.name;
    if (data.slug !== undefined) game.slug = data.slug;
    if (data.description_raw !== undefined)
      game.description_raw = data.description_raw;
    if (data.released !== undefined) game.released = data.released;
    if (data.website !== undefined) game.website = data.website;
    if (data.background_image !== undefined)
      game.background_image = data.background_image;
    if (data.metacritic !== undefined) game.metacritic = data.metacritic;
    if (data.rating !== undefined) game.rating = data.rating;
    if (data.added !== undefined) game.added = data.added;
    if (data.rating_top !== undefined) game.rating_top = data.rating_top;

    // Assign relations using repository.create() to get entity instances
    if (data.genres !== undefined) {
      game.genres = data.genres.map((g) =>
        AppDataSource.getRepository(Genre).create(g)
      );
    }
    if (data.parent_platforms !== undefined) {
      game.parent_platforms = data.parent_platforms.map((p) =>
        AppDataSource.getRepository(ParentPlatform).create(p)
      );
    }
    if (data.stores !== undefined) {
      game.stores = data.stores.map((s) =>
        AppDataSource.getRepository(Store).create(s)
      );
    }
    if (data.publishers !== undefined) {
      game.publishers = data.publishers.map((p) =>
        AppDataSource.getRepository(Publisher).create(p)
      );
    }
    if (data.developers !== undefined) {
      game.developers = data.developers.map((d) =>
        AppDataSource.getRepository(Developer).create(d)
      );
    }
    if (data.tags !== undefined) {
      game.tags = data.tags.map((t) =>
        AppDataSource.getRepository(Tag).create(t)
      );
    }

    await this.gameRepository.save(game);
    return toGameReadDto(game);
  }
}

// Optionally, export a singleton instance for use in controllers
export const gameService = new GameService();

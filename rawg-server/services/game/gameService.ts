import { GameCardDto } from "../../controllers/dto/GameCardDto";
import { GameReadDto } from "../../controllers/dto/GameReadDto";
import { GameUpdateDto } from "../../controllers/dto/GameUpdateDto";
import { ScreenshotReadDto } from "../../controllers/dto/ScreenshotReadDto";
import { TrailerReadDto } from "../../controllers/dto/TrailerReadDto";
import {
  toGameCardDto,
  toGameReadDto,
} from "../../controllers/dto/entityMappers";
import { Developer } from "../../entities/Developer";
import { Game } from "../../entities/Game";
import { Genre } from "../../entities/Genre";
import { ParentPlatform } from "../../entities/ParentPlatform";
import { Publisher } from "../../entities/Publisher";
import { Store } from "../../entities/Store";
import { Tag } from "../../entities/Tag";
import { PaginatedResponse } from "../../interfaces/PaginatedResponse";
import { AppDataSource } from "../../startup/data-source";
import { constructNextUrl } from "../../utils/paginationUtils";
import { buildGameQuery } from "./gameQueryBuilder";

export class GameService {
  private gameRepository = AppDataSource.getRepository(Game);

  /**
   * Get a paginated list of games with filters and sorting.
   */
  async getGames(filters: any): Promise<PaginatedResponse<GameCardDto>> {
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

    const next = constructNextUrl("/games", page, pageSize, total);

    return {
      count: total,
      next,
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
   * Get first trailer for a specific game.
   */
  async getTrailer(gameId: number) {
    const game = await this.gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.trailers", "trailers")
      .where("game.id = :gameId", { gameId })
      .getOne();

    if (!game || !game.trailers || game.trailers.length === 0) {
      return { count: 0, results: [] }; // Return empty response instead of throwing
    }

    const trailer = game.trailers[0]; // Get the first trailer
    const dto: TrailerReadDto = {
      id: trailer.id,
      name: trailer.name,
      preview: trailer.preview,
      data480: trailer.data480,
      dataMax: trailer.dataMax,
    };
    return {
      count: 1,
      results: [dto],
    };
  }

  /**
   * Get screenshots for a specific game.
   */
  async getScreenshots(gameId: number) {
    const game = await this.gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.screenshots", "screenshots")
      .where("game.id = :gameId", { gameId })
      .getOne();

    if (!game || !game.screenshots || game.screenshots.length === 0) {
      throw new Error(`No screenshots found for game with ID "${gameId}"`);
    }

    const results: ScreenshotReadDto[] = game.screenshots.map((screenshot) => ({
      id: screenshot.id,
      image: screenshot.image,
      width: screenshot.width,
      height: screenshot.height,
      is_deleted: screenshot.is_deleted,
    }));

    return {
      count: results.length,
      results,
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
      typeof data.added === "number"
        ? data.added
        : Math.floor(Date.now() / 1000);

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

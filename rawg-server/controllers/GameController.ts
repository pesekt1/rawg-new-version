/**
 * GameController handles CRUD operations and related queries for Game entities.
 * Endpoints for creating, updating, and deleting require admin privileges.
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Route,
  Body,
  Path,
  SuccessResponse,
  Tags,
  Query,
  Security,
} from "tsoa";
import {
  getGame,
  getGames,
  getScreenshots,
  getTrailers,
  createGame,
  deleteGame,
  updateGame,
} from "../services/gameService";
import { Game } from "../entities/Game";
import { GameUpdateDto } from "./dto/GameUpdateDto";

/**
 * Controller for managing Game entities and related resources.
 */
@Route("games")
@Tags("Games")
export class GameController extends Controller {
  /**
   * Get a list of all games, optionally filtered and paginated.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @param genreId Filter by genre.
   * @param storeId Filter by store.
   * @param platformId Filter by platform.
   * @param publisherId Filter by publisher.
   * @param developerId Filter by developer.
   * @param wishlistUserId Filter by wishlist user.
   * @param libraryUserId Filter by library user.
   * @param sortOrder Sort order.
   * @param searchText Search text.
   * @param tagId Filter by tag.
   */
  @Get("/")
  public async getAll(
    @Query() page?: number,
    @Query() page_size?: number,
    @Query() genreId?: string,
    @Query() storeId?: number,
    @Query() platformId?: number,
    @Query() publisherId?: number,
    @Query() developerId?: number,
    @Query() wishlistUserId?: number,
    @Query() libraryUserId?: number,
    @Query() sortOrder?: string,
    @Query() searchText?: string,
    @Query() tagId?: number
  ) {
    // Pass filter params as a plain object
    return getGames({
      page,
      page_size,
      genreId,
      storeId,
      platformId,
      publisherId,
      developerId,
      wishlistUserId,
      libraryUserId,
      sortOrder,
      searchText,
      tagId,
    });
  }

  /**
   * Get a game by ID.
   * @param id Game ID.
   * @returns Game entity or null if not found.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<Game | any> {
    return getGame(id);
  }

  /**
   * Get trailers (movies) for a game by ID.
   * @param id Game ID.
   * @returns List of trailers.
   */
  @Get("{id}/movies")
  public async getTrailers(@Path() id: number) {
    return getTrailers(id);
  }

  /**
   * Get screenshots for a game by ID.
   * @param id Game ID.
   * @returns List of screenshots.
   */
  @Get("{id}/screenshots")
  public async getScreenshots(@Path() id: number) {
    return getScreenshots(id);
  }

  /**
   * Create a new game.
   * Requires admin access.
   * @param data Partial game data.
   * @returns The created Game entity.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: Partial<Game>): Promise<Game> {
    return createGame(data);
  }

  /**
   * Update an existing game.
   * Requires admin access.
   * @param id Game ID.
   * @param data Update data.
   * @returns Updated Game entity.
   */
  @Patch("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: GameUpdateDto // <-- use imported DTO
  ): Promise<Game> {
    return updateGame(id, data);
  }

  /**
   * Delete a game by ID.
   * Requires admin access.
   * @param id Game ID.
   */
  @Delete("{id}")
  @Security("admin")
  public async remove(@Path() id: number): Promise<void> {
    await deleteGame(id);
  }
}

/**
 * GameController handles CRUD operations and related queries for Game entities.
 * All endpoints return DTOs (GameCardDto or GameReadDto) instead of raw entities.
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
import { gameService } from "../services/game/gameService";
import { GameUpdateDto } from "./dto/GameUpdateDto";
import { GameCardDto } from "./dto/GameCardDto";
import { GameReadDto } from "./dto/GameReadDto";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { TrailerReadDto } from "./dto/TrailerReadDto";
import { ScreenshotReadDto } from "./dto/ScreenshotReadDto";

/**
 * Controller for managing Game entities.
 * Returns DTOs for all endpoints.
 */
@Route("games")
@Tags("Games")
export class GameController extends Controller {
  /**
   * Get a list of all games, optionally filtered and paginated.
   * Returns a paginated object with GameCardDto results.
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
  ): Promise<PaginatedResponse<GameCardDto>> {
    // Pass filter params as a plain object
    return gameService.getGames({
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
   * Returns a GameReadDto or throws if not found.
   * @param id Game ID.
   */
  @Get("{id}")
  public async getById(@Path() id: number): Promise<GameReadDto> {
    return gameService.getGame(id);
  }

  /**
   * Get one trailer (movie) for a game by ID.
   * Returns a single trailer DTO.
   * @param id Game ID.
   */
  @Get("{id}/movies")
  public async getTrailer(@Path() id: number) {
    return gameService.getTrailer(id);
  }

  /**
   * Get screenshots for a game by ID.
   * Returns a list of screenshots DTOs.
   * @param id Game ID.
   */
  @Get("{id}/screenshots")
  public async getScreenshots(@Path() id: number) {
    return gameService.getScreenshots(id);
  }

  /**
   * Create a new game.
   * Requires admin access.
   * @param data Game creation data.
   * @returns The created GameReadDto.
   */
  @SuccessResponse("201", "Created")
  @Post("/")
  @Security("admin")
  public async create(@Body() data: GameUpdateDto): Promise<GameReadDto> {
    return gameService.createGame(data);
  }

  /**
   * Update an existing game.
   * Requires admin access.
   * @param id Game ID.
   * @param data Update data.
   * @returns Updated GameReadDto.
   */
  @Patch("{id}")
  @Security("admin")
  public async update(
    @Path() id: number,
    @Body() data: GameUpdateDto
  ): Promise<GameReadDto> {
    return gameService.updateGame(id, data);
  }

  /**
   * Delete a game by ID.
   * Requires admin access.
   * @param id Game ID.
   */
  @Delete("{id}")
  @Security("admin")
  public async remove(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
}

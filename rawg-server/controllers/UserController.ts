/**
 * UserController handles user-related operations, including authentication,
 * and managing a user's wishlist and library.
 * All endpoints require JWT authentication.
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { AuthService } from "../services/authService";
import { gameLibraryService } from "../services/gameLibraryService";
import { userService } from "../services/userService";
import { wishlistService } from "../services/wishlistService";
import { formatListResponse, handleDelete } from "./controllerUtils";
import { GameCardDto } from "./dto/GameCardDto";
import { UserReadDto } from "./dto/UserReadDto";
import { UserUpdateDto } from "./dto/UserUpdateDto";
import { toUserDto } from "./dto/entityMappers";

interface RegisterRequest {
  username: string;
  password: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

/**
 * Controller for user-related operations.
 */
@Route("users")
@Tags("User")
export class UserController extends Controller {
  /**
   * Register a new user.
   * @param body Registration data (username and password).
   * @returns The created user's ID, username, and role.
   */
  @SuccessResponse("201", "Created")
  @Post()
  public async register(
    @Body() body: RegisterRequest
  ): Promise<{ id: number; username: string; role: string }> {
    const { username, password } = body;
    return AuthService.register(username, password);
  }

  /**
   * Authenticate a user and return a JWT token.
   * @param body Login data (username and password).
   * @returns An object containing the authentication token.
   */
  @Post("sessions")
  public async login(
    @Body() body: LoginRequest
  ): Promise<{ token: string; user: UserReadDto }> {
    const { username, password } = body;
    const { token, user } = await AuthService.login(username, password);
    return { token, user: toUserDto(user) };
  }

  /**
   * Get all games in a user's wishlist.
   * Requires the user's ID to be provided in the path.
   * @param userId User ID.
   * @returns A list of games in the user's wishlist.
   */
  @Security("jwt")
  @Get("{userId}/wishlist")
  public async getWishlist(
    @Path() userId: number
  ): Promise<PaginatedResponse<GameCardDto>> {
    return wishlistService.get(userId);
  }

  /**
   * Add a game to a user's wishlist.
   * Requires the user's ID and the game ID to be provided in the path.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns The result of the add operation.
   */
  @Security("jwt")
  @Post("{userId}/wishlist/{gameId}")
  public async addToWishlist(@Path() userId: number, @Path() gameId: number) {
    return wishlistService.add(userId, gameId);
  }

  /**
   * Remove a game from a user's wishlist.
   * Requires the user's ID and the game ID to be provided in the path.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns The result of the remove operation.
   */
  @Security("jwt")
  @Delete("{userId}/wishlist/{gameId}")
  public async removeFromWishlist(
    @Path() userId: number,
    @Path() gameId: number
  ) {
    return wishlistService.remove(userId, gameId);
  }

  /**
   * Get all games in a user's library.
   * Requires the user's ID to be provided in the path.
   * @param userId User ID.
   * @returns A list of games in the user's library.
   */
  @Security("jwt")
  @Get("{userId}/library")
  public async getLibrary(
    @Path() userId: number
  ): Promise<PaginatedResponse<GameCardDto>> {
    return gameLibraryService.get(userId);
  }

  /**
   * Add a game to a user's library.
   * Requires the user's ID and the game ID to be provided in the path.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns The result of the add operation.
   */
  @Security("jwt")
  @Post("{userId}/library/{gameId}")
  public async addToLibrary(@Path() userId: number, @Path() gameId: number) {
    return gameLibraryService.add(userId, gameId);
  }

  /**
   * Remove a game from a user's library.
   * Requires the user's ID and the game ID to be provided in the path.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns The result of the remove operation.
   */
  @Security("jwt")
  @Delete("{userId}/library/{gameId}")
  public async removeFromLibrary(
    @Path() userId: number,
    @Path() gameId: number
  ) {
    return gameLibraryService.remove(userId, gameId);
  }

  /**
   * Get all users (admin only) with optional pagination.
   * @param page Page number for pagination.
   * @param page_size Number of items per page.
   * @returns PaginatedResponse containing user DTOs.
   */
  @Security("admin")
  @Get("/")
  public async getAllUsers(
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<{ count: number; next: string | null; results: UserReadDto[] }> {
    const baseUrl = "users";
    return formatListResponse(userService, baseUrl, { page, page_size });
  }

  /**
   * Get a user by ID.
   * Public access
   * @param id User ID.
   * @returns User DTO or null if not found.
   */
  @Get("{id}")
  public async getUserById(@Path() id: number): Promise<UserReadDto | null> {
    return userService.getByIdDto(id);
  }

  /**
   * Update an existing user.
   * Requires user access.
   * @param id User ID.
   * @param data Update data.
   * @returns Updated User DTO or null if not found.
   */
  @Put("{id}")
  @Security("jwt")
  public async update(
    @Path() id: number,
    @Body() data: UserUpdateDto
  ): Promise<UserReadDto | null> {
    return userService.updateDto(id, data);
  }

  /**
   * Delete a user by ID.
   * Requires user access.
   * @param id User ID.
   * @returns Message indicating result.
   */
  @Delete("{id}")
  @Security("jwt")
  public async delete(@Path() id: number): Promise<{ message: string }> {
    return handleDelete(userService, id);
  }
}

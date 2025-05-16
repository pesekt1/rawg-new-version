/**
 * UserController handles user-related operations, including authentication,
 * and managing a user's wishlist and library.
 * All endpoints require JWT authentication.
 */

import {
  Controller,
  Post,
  Route,
  Body,
  SuccessResponse,
  Tags,
  Get,
  Delete,
  Security,
  Path,
} from "tsoa";
import { AuthService } from "../services/authService";
import { wishlistService } from "../services/wishlistService";
import { gameLibraryService } from "../services/gameLibraryService";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { GameCardDto } from "./dto/GameCardDto";

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
  public async login(@Body() body: LoginRequest): Promise<{ token: string }> {
    const { username, password } = body;
    return AuthService.login(username, password);
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
}

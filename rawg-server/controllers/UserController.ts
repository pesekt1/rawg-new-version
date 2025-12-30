/**
 * UserController handles user-related operations, including authentication,
 * and managing a user's wishlist and library.
 * All endpoints require JWT authentication.
 */

import crypto from "crypto";
import type Express from "express";
import {
  Body,
  Consumes,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Query,
  Request,
  Route,
  Security,
  SuccessResponse,
  Tags,
  UploadedFile,
} from "tsoa";
import { PaginatedResponse } from "../interfaces/PaginatedResponse";
import { AuthService } from "../services/authService";
import {
  deleteAllUserAvatars,
  uploadAvatarToAzure,
} from "../services/azureBlobStorageService";
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
  email?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

type UploadedAvatarFile = {
  size: number;
  mimetype: string;
  buffer: Buffer;
  originalname?: string;
};

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024; // 5MB

function extFromMime(mime: string) {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    default:
      return null;
  }
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
  ): Promise<{ token: string; user: UserReadDto }> {
    const { username, password, email } = body;

    const { token, user } = await AuthService.register(
      username,
      password,
      "user",
      email
    );

    return { token, user: toUserDto(user) };
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

  /**
   * Upload avatar for the authenticated user.
   * multipart/form-data with field name "file"
   */
  @Security("jwt")
  @Post("me/avatar")
  @Consumes("multipart/form-data")
  @SuccessResponse("201", "Created")
  public async uploadMyAvatar(
    @Request() req: Express.Request,
    @UploadedFile("file") file?: UploadedAvatarFile
  ): Promise<{ avatarUrl: string }> {
    const authUserId = ((req as any)?.user?.userId ??
      (req as any)?.user?.id) as number | undefined;

    if (!authUserId) {
      this.setStatus(401);
      throw new Error("Unauthorized");
    }

    if (!file) {
      this.setStatus(400);
      throw new Error('Missing file field "file"');
    }

    const maxBytes = Number(process.env.AVATAR_MAX_BYTES ?? DEFAULT_MAX_BYTES);
    if (file.size > maxBytes) {
      this.setStatus(413);
      throw new Error(`File too large (max ${maxBytes} bytes)`);
    }

    const ext = extFromMime(file.mimetype);
    if (!ext) {
      this.setStatus(415);
      throw new Error("Unsupported media type");
    }

    if (!file.buffer || file.buffer.length === 0) {
      this.setStatus(400);
      throw new Error("Empty upload");
    }

    await deleteAllUserAvatars(authUserId); // delete previous avatars

    const blobName = `avatars/users/${authUserId}/${Date.now()}-${crypto.randomUUID()}${ext}`;
    const avatarUrl = await uploadAvatarToAzure({
      blobName,
      buffer: file.buffer,
      contentType: file.mimetype,
    });

    const updated = await userService.updateAvatarUrl(authUserId, avatarUrl);
    if (!updated) {
      this.setStatus(404);
      throw new Error("User not found");
    }

    this.setStatus(201);
    return { avatarUrl };
  }
}

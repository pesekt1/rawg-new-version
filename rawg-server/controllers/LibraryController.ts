/**
 * LibraryController manages the user's game library relations.
 * Provides endpoints to get, add, and remove games from a user's library.
 */

import { Controller, Get, Post, Delete, Route, Path, Tags } from "tsoa";
import { gameLibraryService } from "../services/gameLibraryService";
import { IUserGameRelationController } from "./IUserGameRelationController";

/**
 * Controller for managing user game libraries.
 */
@Route("library")
@Tags("Library")
export class LibraryController
  extends Controller
  implements IUserGameRelationController
{
  /**
   * Get all games in a user's library.
   * @param userId User ID.
   * @returns List of games in the user's library.
   */
  @Get("{userId}")
  public async get(@Path() userId: number) {
    return gameLibraryService.get(userId);
  }

  /**
   * Add a game to a user's library.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the add operation.
   */
  @Post("{userId}/{gameId}")
  public async add(@Path() userId: number, @Path() gameId: number) {
    return gameLibraryService.add(userId, gameId);
  }

  /**
   * Remove a game from a user's library.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the remove operation.
   */
  @Delete("{userId}/{gameId}")
  public async remove(@Path() userId: number, @Path() gameId: number) {
    return gameLibraryService.remove(userId, gameId);
  }
}

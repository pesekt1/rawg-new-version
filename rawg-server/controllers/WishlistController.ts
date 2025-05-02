/**
 * WishlistController manages the user's wishlist relations.
 * Provides endpoints to get, add, and remove games from a user's wishlist.
 */

import { Controller, Get, Post, Delete, Route, Path, Tags } from "tsoa";
import { wishlistService } from "../services/wishlistService";
import { IUserGameRelationController } from "./IUserGameRelationController";

/**
 * Controller for managing user wishlists.
 */
@Route("wishlist")
@Tags("Wishlist")
export class WishlistController
  extends Controller
  implements IUserGameRelationController
{
  /**
   * Get all games in a user's wishlist.
   * @param userId User ID.
   * @returns List of games in the user's wishlist.
   */
  @Get("{userId}")
  public async get(@Path() userId: number) {
    return wishlistService.get(userId);
  }

  /**
   * Add a game to a user's wishlist.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the add operation.
   */
  @Post("{userId}/{gameId}")
  public async add(@Path() userId: number, @Path() gameId: number) {
    return wishlistService.add(userId, gameId);
  }

  /**
   * Remove a game from a user's wishlist.
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the remove operation.
   */
  @Delete("{userId}/{gameId}")
  public async remove(@Path() userId: number, @Path() gameId: number) {
    return wishlistService.remove(userId, gameId);
  }
}

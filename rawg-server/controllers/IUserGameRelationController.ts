/**
 * Interface for controllers managing user-game relations (e.g., wishlist, library).
 */
export interface IUserGameRelationController {
  /**
   * Get all games related to a user.
   * @param userId User ID.
   * @returns List or data related to the user's games.
   */
  get(userId: number): Promise<any>;

  /**
   * Add a game to the user's relation (e.g., wishlist or library).
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the add operation.
   */
  add(userId: number, gameId: number): Promise<any>;

  /**
   * Remove a game from the user's relation (e.g., wishlist or library).
   * @param userId User ID.
   * @param gameId Game ID.
   * @returns Result of the remove operation.
   */
  remove(userId: number, gameId: number): Promise<any>;
}

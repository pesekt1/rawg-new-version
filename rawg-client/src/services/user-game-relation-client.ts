import { axiosInstance } from "./api-client";

/**
 * UserGameRelationClient is a generic client for managing user-game relations,
 * such as adding or removing games from a user's library or wishlist.
 *
 * @template T - The type of the relation entity (e.g. LibraryEntry, WishlistEntry).
 */
export class UserGameRelationClient<T> {
  private endpoint: string;

  /**
   * Create a new UserGameRelationClient for a specific relation endpoint.
   * @param endpoint - The API endpoint for the relation (e.g. "/library", "/wishlist").
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Get the list of related games for a user.
   * @param userId - The user's ID.
   * @returns A promise resolving to an array of relation entities.
   */
  getUserList = (userId: number): Promise<T[]> =>
    axiosInstance
      .get<T[]>(`${this.endpoint}/${userId}`)
      .then((res) => res.data);

  /**
   * Add a game to the user's relation list (e.g. library or wishlist).
   * @param userId - The user's ID.
   * @param gameId - The game's ID.
   * @returns A promise resolving to the created relation entity.
   */
  add = (userId: number, gameId: number): Promise<T> =>
    axiosInstance
      .post<T>(`${this.endpoint}/${userId}/${gameId}`)
      .then((res) => res.data);

  /**
   * Remove a game from the user's relation list.
   * @param userId - The user's ID.
   * @param gameId - The game's ID.
   * @returns A promise resolving to void.
   */
  remove = (userId: number, gameId: number): Promise<void> =>
    axiosInstance
      .delete<void>(`${this.endpoint}/${userId}/${gameId}`)
      .then((res) => res.data);
}

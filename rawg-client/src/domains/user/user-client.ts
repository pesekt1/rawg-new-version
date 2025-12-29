import * as Sentry from "@sentry/react";
import { axiosInstance } from "../../services/api-client";
import { User } from "./User";

export class UserClient {
  private basePath = "users";

  /**
   * Authenticate a user and return a JWT token.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A promise resolving to the authentication response.
   */
  login = async (
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Login attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post(`/${this.basePath}/sessions`, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  /**
   * Register a new user.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response.
   */
  register = async (username: string, password: string, email?: string) => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Register attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post(`/${this.basePath}`, {
        username,
        password,
        email,
      });
      return res.data;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };

  /**
   * Get the list of related games for a user.
   * @param userId - The user's ID.
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to an array of games.
   */
  getUserGames = (userId: number, relation: "wishlist" | "library") =>
    axiosInstance
      .get(`/${this.basePath}/${userId}/${relation}`)
      .then((res) => res.data);

  /**
   * Add a game to a user's relation list.
   * @param userId - The user's ID.
   * @param gameId - The game's ID.
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to the created relation entity.
   */
  addGame = (
    userId: number,
    gameId: number,
    relation: "wishlist" | "library"
  ) =>
    axiosInstance
      .post(`/${this.basePath}/${userId}/${relation}/${gameId}`)
      .then((res) => res.data);

  /**
   * Remove a game from a user's relation list.
   * @param userId - The user's ID.
   * @param gameId - The game's ID.
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to void.
   */
  removeGame = (
    userId: number,
    gameId: number,
    relation: "wishlist" | "library"
  ) =>
    axiosInstance
      .delete(`/${this.basePath}/${userId}/${relation}/${gameId}`)
      .then((res) => res.data);
}

const userClient = new UserClient();
export default userClient;

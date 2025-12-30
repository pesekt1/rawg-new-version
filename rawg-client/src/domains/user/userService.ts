import ApiClient from "../../services/api-client";
import { isTokenValid } from "../auth/useAuth";
import { User } from "./User";
import userClient from "./user-client";

const apiClient = new ApiClient<User>("/users");

const TOKEN_KEY = "token";

const userService = {
  /**
   * Fetch all users from the API.
   * @returns A promise resolving to a paginated response of users.
   */
  getAll: apiClient.getAll,

  /**
   * Fetch a user by ID from the API.
   * @param id - The user's ID.
   * @returns A promise resolving to the user object.
   */
  get: (id: number) => apiClient.get(id),

  /**
   * Update a user by ID.
   * @param id - The user's ID.
   * @param data - The data to update.
   * @returns A promise resolving to the updated user object.
   */
  put: (id: number, data: Partial<User>) => apiClient.put(id, data),

  /**
   * Delete a user by ID.
   * @param id - The user's ID.
   * @returns A promise resolving to the delete operation result.
   */
  delete: (id: number) => apiClient.delete(id),

  /**
   * Log in a user and store the token.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A promise resolving to the authentication response.
   */
  login: async (username: string, password: string) => {
    const data = await userClient.login(username, password);
    userService.saveToken(data.token);
    return data;
  },

  /**
   * Register a new user.
   * @param username - The desired username.
   * @param password - The desired password.
   * @param email - The user's email (optional).
   * @returns A promise resolving to the registration response.
   */
  register: (username: string, password: string, email?: string) =>
    userClient.register(username, password, email),

  /**
   * Log out the current user by removing the token.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Save a token to localStorage.
   * @param token - The JWT token string.
   */
  saveToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  /**
   * Get the current user's token.
   * @returns The token string, or null if not present.
   */
  getToken: () => localStorage.getItem(TOKEN_KEY),

  /**
   * Get the current user's ID from the token.
   * @returns The user ID, or null if the token is invalid.
   */
  getUserIdFromToken: (): number | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));
      return payload.userId ?? null;
    } catch {
      return null;
    }
  },

  /**
   * Helper to ensure the user is authenticated and return the user ID.
   * Validates the token before extracting the user ID.
   * @returns The user ID.
   * @throws An error if the user is not authenticated or the token is invalid.
   */
  ensureAuthenticated: (): number => {
    const token = userService.getToken();
    if (!isTokenValid(token)) {
      throw new Error("Authentication required: Token is invalid or expired.");
    }
    const userId = userService.getUserIdFromToken();
    if (!userId)
      throw new Error("Authentication required: User is not logged in.");
    return userId;
  },

  /**
   * Get the list of games in a user's wishlist or library.
   * If no userId is provided, it defaults to the authenticated user's ID.
   * @param userId - The user's ID (optional).
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to an array of games.
   */
  getUserGames: (relation: "wishlist" | "library", userId?: number) => {
    const resolvedUserId = userId ?? userService.ensureAuthenticated();
    // Use authenticated user id if userId is not provided
    // if we are looking at other user's games, we provide userId
    return userClient.getUserGames(resolvedUserId, relation);
  },

  /**
   * Add a game to the current user's wishlist or library.
   * @param gameId - The game's ID.
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to the created relation entity.
   */
  addGame: (gameId: number, relation: "wishlist" | "library") => {
    const userId = userService.ensureAuthenticated();
    return userClient.addGame(userId, gameId, relation);
  },

  /**
   * Remove a game from the current user's wishlist or library.
   * @param gameId - The game's ID.
   * @param relation - The relation type ("wishlist" or "library").
   * @returns A promise resolving to void.
   */
  removeGame: (gameId: number, relation: "wishlist" | "library") => {
    const userId = userService.ensureAuthenticated();
    return userClient.removeGame(userId, gameId, relation);
  },
};

export default userService;

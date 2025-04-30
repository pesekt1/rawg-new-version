import authClient from "../../services/auth-client";

const TOKEN_KEY = "token";

/**
 * Service for handling authentication actions such as login, registration, and token management.
 * Handles storing and removing the authentication token in localStorage.
 * Delegates HTTP requests to the shared authClient.
 */
const authService = {
  /**
   * Log in a user with username and password.
   * Stores the received token in localStorage.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A promise resolving to the authentication response.
   */
  login: async (username: string, password: string) => {
    const data = await authClient.login(username, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  /**
   * Register a new user with username and password.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response.
   */
  register: (username: string, password: string) =>
    authClient.register(username, password),

  /**
   * Log out the current user by removing the token from localStorage.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Get the current user's token from localStorage.
   * @returns The token string, or null if not present.
   */
  getToken: () => localStorage.getItem(TOKEN_KEY),
};

export default authService;

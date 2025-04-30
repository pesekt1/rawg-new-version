import authClient from "../../services/auth-client";

const TOKEN_KEY = "token";

/**
 * Service for handling authentication actions such as login and registration.
 * Delegates to the shared authClient for HTTP requests.
 */
const authService = {
  /**
   * Log in a user with username and password.
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
   * Log out the current user, removing the token from storage.
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Get the current user's token from storage.
   * @returns The token string, or null if not present.
   */
  getToken: () => localStorage.getItem(TOKEN_KEY),
};

export default authService;

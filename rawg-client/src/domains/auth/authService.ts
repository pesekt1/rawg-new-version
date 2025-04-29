import authClient from "../../services/auth-client";

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
  login: (username: string, password: string) =>
    authClient.login(username, password),

  /**
   * Register a new user with username and password.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response.
   */
  register: (username: string, password: string) =>
    authClient.register(username, password),

  // Add more methods as needed
};

export default authService;

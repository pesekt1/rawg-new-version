import { axiosInstance } from "./api-client";

/**
 * AuthClient provides authentication methods for login and registration.
 * Uses the shared axiosInstance for HTTP requests.
 */
class AuthClient {
  private endpoint: string;

  /**
   * Create a new AuthClient.
   * @param endpoint - The authentication API endpoint (default: "/auth")
   */
  constructor(endpoint: string = "/auth") {
    this.endpoint = endpoint;
  }

  /**
   * Log in a user with username and password.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A promise resolving to the authentication response (e.g. JWT token).
   */
  login = (username: string, password: string) =>
    axiosInstance
      .post(`${this.endpoint}/login`, { username, password })
      .then((res) => res.data);

  /**
   * Register a new user with username and password.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response.
   */
  register = (username: string, password: string) =>
    axiosInstance
      .post(`${this.endpoint}/register`, { username, password })
      .then((res) => res.data);
}

/**
 * Singleton instance of AuthClient for use throughout the app.
 */
const authClient = new AuthClient();
export default authClient;

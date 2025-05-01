/**
 * AuthClient
 * ----------
 * This module provides authentication methods (login and registration) using a shared axios instance.
 *
 * Sentry Integration:
 * - Adds breadcrumbs for login and registration attempts (category: "auth").
 * - Captures exceptions for failed authentication requests.
 * This ensures authentication events and errors are logged and traceable in Sentry.
 */

import { axiosInstance } from "./api-client";
import * as Sentry from "@sentry/react";

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
  login = async (username: string, password: string) => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Login attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post(`${this.endpoint}/login`, {
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
   * Register a new user with username and password.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response.
   */
  register = async (username: string, password: string) => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Register attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post(`${this.endpoint}/register`, {
        username,
        password,
      });
      return res.data;
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  };
}

/**
 * Singleton instance of AuthClient for use throughout the app.
 */
const authClient = new AuthClient();
export default authClient;

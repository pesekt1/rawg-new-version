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
  /**
   * Log in a user with username and password.
   * Sends a POST request to the "sessions" endpoint to authenticate the user.
   * @param username - The user's username.
   * @param password - The user's password.
   * @returns A promise resolving to the authentication response (e.g., JWT token).
   * @throws An error if the login request fails.
   */
  login = async (username: string, password: string) => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Login attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post("sessions", {
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
   * Sends a POST request to the "users" endpoint to create a new user.
   * @param username - The desired username.
   * @param password - The desired password.
   * @returns A promise resolving to the registration response (e.g., user details).
   * @throws An error if the registration request fails.
   */
  register = async (username: string, password: string) => {
    Sentry.addBreadcrumb({
      category: "auth",
      message: `Register attempt for user: ${username}`,
      level: "info",
    });
    try {
      const res = await axiosInstance.post("users", {
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

import { useMemo } from "react";
import useAuthStore from "../../state/useAuthStore";
import { User } from "../user/User";
import userService from "../user/userService";

/**
 * React hook for accessing and managing authentication state in components.
 * Uses userService for token storage and retrieval.
 * Provides helpers for saving tokens, logging out, and accessing user info.
 *
 * @returns An object with:
 *   - token: The current JWT token (string).
 *   - saveToken: Function to update the token in state and storage.
 *   - logout: Function to clear the token from state and storage.
 *   - isAuthenticated: Boolean indicating if the user is authenticated.
 *   - user: The current user object (User or null), containing id, username, and role.
 */
export function useAuth() {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const resetToken = useAuthStore((s) => s.resetToken);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const resetUser = useAuthStore((s) => s.resetUser);

  const saveToken = (newToken: string) => {
    setToken(newToken);
    userService.saveToken(newToken);
  };

  const saveUser = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    resetToken();
    resetUser();
    userService.logout();
  };

  const isAuthenticated = useMemo(() => isTokenValid(token), [token]);

  return {
    token,
    saveToken,
    saveUser,
    logout,
    isAuthenticated,
    user,
    role: user?.role,
  };
}

/**
 * Checks if a JWT token is valid by decoding it and checking the expiration time.
 * @param token - The JWT token to check.
 * @returns True if the token is valid (not expired), false otherwise.
 */
export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return false;
    const payload = JSON.parse(atob(payloadBase64));
    if (!payload.exp) return false;
    // exp is in seconds since epoch
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

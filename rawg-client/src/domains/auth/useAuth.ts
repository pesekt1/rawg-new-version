import { useState, useMemo } from "react";
import { User } from "./User";
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
 *   - role: The user's role (string or null), extracted from the token.
 *   - user: The current user object (User or null), containing id, username, and role.
 */
export function useAuth() {
  const [token, setToken] = useState(() => {
    const t = userService.getToken();
    return isTokenValid(t) ? t! : "";
  });

  const saveToken = (newToken: string) => {
    if (token === newToken) return;
    setToken(newToken);
    // Token is already saved in userService during login
  };

  const logout = () => {
    if (!token) return;
    setToken("");
    userService.logout();
  };

  const isAuthenticated = useMemo(() => isTokenValid(token), [token]);
  const role = useMemo(() => getUserRole(token), [token]);
  const user = useMemo(() => getUserFromToken(token), [token]);

  return { token, saveToken, logout, isAuthenticated, role, user };
}

// Helper functions

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

function getUserRole(token: string | null): string | null {
  if (!token) return null;
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    const payload = JSON.parse(atob(payloadBase64));
    return payload.role || null;
  } catch {
    return null;
  }
}

function getUserFromToken(token: string | null): User | null {
  if (!token) return null;
  try {
    const [, payloadBase64] = token.split(".");
    if (!payloadBase64) return null;
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    // Use userId if present, otherwise id
    const id = payload.userId ?? payload.id;
    if (!id || !payload.username) return null;
    return { id, username: payload.username, role: payload.role };
  } catch (e) {
    return null;
  }
}

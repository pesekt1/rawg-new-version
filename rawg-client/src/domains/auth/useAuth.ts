import { useState } from "react";

function isTokenValid(token: string | null): boolean {
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

function getUserFromToken(
  token: string | null
): { id: number; username: string; role: string } | null {
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

export function useAuth() {
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem("token");
    return isTokenValid(t) ? t! : "";
  });

  const saveToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isAuthenticated = isTokenValid(token);
  const role = getUserRole(token);
  const user = getUserFromToken(token);

  return { token, saveToken, logout, isAuthenticated, role, user };
}

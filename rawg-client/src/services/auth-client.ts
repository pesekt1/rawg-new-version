import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = (username: string, password: string) =>
  axios
    .post(`${API_URL}/auth/login`, { username, password })
    .then((res) => res.data);

export const register = (username: string, password: string) =>
  axios
    .post(`${API_URL}/auth/register`, { username, password })
    .then((res) => res.data);

import { create } from "zustand";
import { User } from "../domains/auth/User";

interface AuthStore {
  user: User;
  token: string;
  setUser: (user: User) => void;
  resetUser: () => void;
  setToken: (token: string) => void;
  resetToken: () => void;
}

const getInitialToken = () => localStorage.getItem("token") || "";
const getInitialUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : ({} as User);
};

const useAuthStore = create<AuthStore>((set) => ({
  user: getInitialUser(),
  token: getInitialToken(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set(() => ({ user }));
  },
  resetUser: () => {
    localStorage.removeItem("user");
    set(() => ({ user: {} as User }));
  },
  setToken: (token) => {
    localStorage.setItem("token", token);
    set(() => ({ token }));
  },
  resetToken: () => {
    localStorage.removeItem("token");
    set(() => ({ token: "" }));
  },
}));

export default useAuthStore;

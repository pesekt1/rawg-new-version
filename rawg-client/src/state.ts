import { create } from "zustand";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  storeId?: number;
  publisherId?: number;
  developerId?: number;
  tagId?: number;
  sortOrder: string;
  searchText: string;
  wishlistUserId?: number;
  libraryUserId?: number;
}

interface BrowseListQuery {
  selectedKey?: string; // e.g., "stores", "genres", etc.
}

interface User {
  id: number;
  username: string;
  role: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  browseListQuery: BrowseListQuery;
  user: User;
  token: string;
  setGenreId: (genreId?: number) => void;
  setPlatformId: (platformId?: number) => void;
  setStoreId: (storeId?: number) => void;
  setPublisherId: (publisherId?: number) => void;
  setDeveloperId: (developerId?: number) => void;
  setTagId: (tagId?: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  setWishlistUserId: (wishlistUserId?: number) => void;
  setLibraryUserId: (libraryUserId?: number) => void;
  setBrowseListKey: (key?: string) => void;
  setUser: (user: User) => void;
  resetUser: () => void;
  resetBrowseListQuery: () => void;
  reset: () => void;
  setToken: (token: string) => void;
  resetToken: () => void;
}

const getInitialToken = () => localStorage.getItem("token") || "";
const getInitialUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : ({} as User);
};

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {} as GameQuery,
  browseListQuery: {} as BrowseListQuery,
  user: getInitialUser(),
  token: getInitialToken(),
  setGenreId: (genreId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        genreId,
        searchText: "",
      },
    })),
  setPlatformId: (platformId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        platformId,
        searchText: "",
      },
    })),
  setStoreId: (storeId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        storeId,
        searchText: "",
      },
    })),
  setPublisherId: (publisherId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        publisherId,
        searchText: "",
      },
    })),
  setDeveloperId: (developerId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        developerId,
        searchText: "",
      },
    })),
  setTagId: (tagId) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        tagId,
        searchText: "",
      },
    })),
  setSortOrder: (sortOrder) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        sortOrder,
      },
    })),
  setSearchText: (searchText) =>
    set((state) => ({
      gameQuery: {
        ...state.gameQuery,
        searchText,
      },
    })),
  setWishlistUserId: (wishlistUserId) =>
    set(() => ({
      gameQuery: {
        wishlistUserId: wishlistUserId,
        libraryUserId: undefined,
        sortOrder: "",
        searchText: "",
      },
    })),
  setLibraryUserId: (libraryUserId) =>
    set(() => ({
      gameQuery: {
        libraryUserId: libraryUserId,
        wishlistUserId: undefined,
        sortOrder: "",
        searchText: "",
      },
    })),
  setBrowseListKey: (key) =>
    set(() => ({
      browseListQuery: { selectedKey: key },
    })),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set(() => ({ user }));
  },
  resetUser: () => {
    localStorage.removeItem("user");
    set(() => ({ user: {} as User }));
  },
  resetBrowseListQuery: () =>
    set(() => ({
      browseListQuery: {} as BrowseListQuery,
    })),
  reset: () => set({ gameQuery: {} as GameQuery }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set(() => ({ token }));
  },
  resetToken: () => {
    localStorage.removeItem("token");
    set(() => ({ token: "" }));
  },
}));

export default useGameQueryStore;

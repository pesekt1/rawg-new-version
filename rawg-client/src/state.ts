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

interface GameQueryStore {
  gameQuery: GameQuery;
  browseListQuery: BrowseListQuery;
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
  resetBrowseListQuery: () => void;
  reset: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {} as GameQuery,
  browseListQuery: {} as BrowseListQuery,
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
  resetBrowseListQuery: () =>
    set(() => ({
      browseListQuery: {} as BrowseListQuery,
    })),
  reset: () => set({ gameQuery: {} as GameQuery }),
}));

export default useGameQueryStore;

import { create } from "zustand";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  storeId?: number;
  publisherId?: number;
  sortOrder: string;
  searchText: string;
  wishlistId?: number; // add this line
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (genreId?: number) => void;
  setPlatformId: (platformId?: number) => void;
  setStoreId: (storeId?: number) => void;
  setPublisherId: (publisherId?: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  setWishlistId: (wishlistId?: number) => void; // add this line
  reset: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {} as GameQuery,
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
  setWishlistId: (wishlistId) =>
    set(() => ({
      gameQuery: {
        wishlistId,
        sortOrder: "",
        searchText: "",
      },
    })),
  reset: () => set({ gameQuery: {} as GameQuery }),
}));

export default useGameQueryStore;

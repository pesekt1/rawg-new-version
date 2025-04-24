import { create } from "zustand";

interface GameQuery {
  genreId?: number;
  platformId?: number;
  storeId?: number;
  publisherId?: number;
  sortOrder: string;
  searchText: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenreId: (genreId?: number) => void;
  setPlatformId: (platformId?: number) => void;
  setStoreId: (storeId?: number) => void;
  setPublisherId: (publisherId?: number) => void;
  setSortOrder: (sortOrder: string) => void;
  setSearchText: (searchText: string) => void;
  reset: () => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {} as GameQuery,
  setGenreId: (genreId) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, genreId } })),
  setPlatformId: (platformId) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, platformId } })),
  setStoreId: (storeId) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, storeId } })),
  setPublisherId: (publisherId) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, publisherId } })),
  setSortOrder: (sortOrder) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, sortOrder } })),
  setSearchText: (searchText) =>
    set((state) => ({ gameQuery: { ...state.gameQuery, searchText } })),
  reset: () => set({ gameQuery: {} as GameQuery }),
}));

export default useGameQueryStore;

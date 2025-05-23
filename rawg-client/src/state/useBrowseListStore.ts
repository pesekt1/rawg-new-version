import { create } from "zustand";

interface BrowseListStore {
  selectedKey?: string;
  setSelectedKey: (key?: string) => void;
  reset: () => void;
}

const useBrowseListStore = create<BrowseListStore>((set) => ({
  selectedKey: undefined,
  setSelectedKey: (key) => set({ selectedKey: key }),
  reset: () => set({ selectedKey: undefined }),
}));

export default useBrowseListStore;

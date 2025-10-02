// store/urlStore.js
import { create } from "zustand";

const useUrlStore = create((set) => ({
  // States
  inputUrl: "",
  isUrlNew: true,
  shortUrl: "",
  loading: false,
  error: "",
  copied: false,
  useAlias: false,
  alias: "",
  isUnique: true,

  // Actions
  setInputUrl: (value) => set({ inputUrl: value }),
  setIsUrlNew: (value) => set({ isUrlNew: value }),
  setShortUrl: (value) => set({ shortUrl: value }),
  setLoading: (value) => set({ loading: value }),
  setError: (value) => set({ error: value }),
  setCopied: (value) => set({ copied: value }),
  setUseAlias: (value) => set({ useAlias: value }),
  setAlias: (value) => set({ alias: value }),
  setIsUnique: (value) => set({ isUnique: value }),

  // Optional: reset function to clear all
  reset: () =>
    set({
      inputUrl: "",
      isUrlNew: true,
      shortUrl: "",
      loading: false,
      error: "",
      copied: false,
      useAlias: false,
      alias: "",
      isUnique: true,
    }),
}));

export default useUrlStore;

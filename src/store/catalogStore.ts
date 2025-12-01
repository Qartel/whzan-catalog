// src/store/catalogStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SortBy = 'price' | 'rating' | 'updatedAt' | 'name';
export type SortDir = 'asc' | 'desc';

type CatalogState = {
  // Filters / view state
  search: string;
  tag: string | null;
  inStockOnly: boolean;
  sortBy: SortBy;
  sortDir: SortDir;
  page: number;
  pageSize: number;

  // Favorites (product IDs)
  favorites: string[];

  // Actions
  setSearch: (value: string) => void;
  setTag: (tag: string | null) => void;
  setInStockOnly: (value: boolean) => void;
  setSort: (sortBy: SortBy, sortDir: SortDir) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

export const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      search: '',
      tag: null,
      inStockOnly: false,
      sortBy: 'updatedAt',
      sortDir: 'desc',
      page: 1,
      pageSize: 20,

      favorites: [],

      setSearch: (value) =>
        set({
          search: value,
          page: 1, // reset to first page when search changes
        }),
      setTag: (tag) =>
        set({
          tag,
          page: 1,
        }),
      setInStockOnly: (value) =>
        set({
          inStockOnly: value,
          page: 1,
        }),
      setSort: (sortBy, sortDir) =>
        set({
          sortBy,
          sortDir,
          page: 1,
        }),
      setPage: (page) => set({ page }),
      setPageSize: (pageSize) =>
        set({
          pageSize,
          page: 1,
        }),

      toggleFavorite: (id) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((x) => x !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },

      isFavorite: (id) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: 'whzan-catalog-store',
      // Only persist favorites for now
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);

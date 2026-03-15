import { create } from 'zustand';
import { api, getUserFullInfo } from '../lib/api';
import type { Note } from '../types/notices';

interface FavoritesStore {
  favoriteIds: string[];
  isLoading: boolean;

  fetchFavorites: () => Promise<void>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoriteIds: [],
  isLoading: false,

  fetchFavorites: async () => {
    set({ isLoading: true });

    try {
      const res = await getUserFullInfo();
      const favorites = res.noticesFavorites || [];
      const favoriteIds = favorites.map((item: Note) => item._id);
      set({ favoriteIds });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },

  addFavorite: async (id) => {
    const res = await api.post(`notices/favorites/add/${id}`);
    set({ favoriteIds: res.data });
  },

  removeFavorite: async (id) => {
    const res = await api.delete(`notices/favorites/remove/${id}`);
    set({ favoriteIds: res.data });
  },
}));

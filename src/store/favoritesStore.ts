import { create } from 'zustand';
import { api, getUserFullInfo } from '../lib/api';
import type { Note } from '../types/notices';
import { useAuthStore } from './authStore';

interface FavoritesStore {
  favoriteIds: string[];
  isLoading: boolean;

  fetchFavorites: () => Promise<void>;
  addFavorite: (note: Note) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
}

// interface PetInfo {
//   name: string;
//   title: string;
//   imgURL: string;
//   species: string;
//   birthday: string;
//   sex: string;
// }

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

  addFavorite: async (note: Note) => {
    try {
      const res = await api.post(`notices/favorites/add/${note._id}`);
      set({ favoriteIds: res.data });

      useAuthStore.getState().addUserFavoriteNotice(note);
    } catch (error) {
      console.error(error);
    }
  },

  removeFavorite: async (id) => {
    try {
      const res = await api.delete(`notices/favorites/remove/${id}`);
      set({ favoriteIds: res.data });

      useAuthStore.getState().removeUserFavoriteNotice(id);
    } catch (error) {
      console.error(error);
    }
  },

  // createPet: async (payload) => {
  //   const res = await api.post('users/current/pets/add', {
  //     params: payload,
  //   });
  //   return res.data;
  // },
}));

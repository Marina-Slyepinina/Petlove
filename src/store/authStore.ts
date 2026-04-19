import { create } from 'zustand';
import { api, clearAuthHeader, setAuthHeader } from '../lib/api';
import type { AuthResponse, AuthState } from '../types/auth';
import type { Note } from '../types/notices';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRefreshing: false,

  register: async (credentials) => {
    const { data } = await api.post<AuthResponse>('/users/signup', credentials);

    setAuthHeader(data.token);

    localStorage.setItem('token', data.token);

    try {
      const { data: currentUser } = await api.get('/users/current/full');

      set({
        user: currentUser,
        token: data.token,
        isLoggedIn: true,
      });
    } catch {
      console.error('Failed to fetch full profile after register');
    }
  },

  login: async (credentials) => {
    const { data } = await api.post<AuthResponse>('/users/signin', credentials);

    setAuthHeader(data.token);

    localStorage.setItem('token', data.token);

    try {
      const { data: currentUser } = await api.get('/users/current/full');

      set({
        user: currentUser,
        token: data.token,
        isLoggedIn: true,
      });
    } catch {
      console.error('Failed to fetch full profile after login');
    }
  },

  logout: async () => {
    await api.post('users/signout');
    clearAuthHeader();
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },

  refreshUser: async () => {
    const persistedToken = localStorage.getItem('token');
    if (!persistedToken) return;

    try {
      set({ isRefreshing: true });
      setAuthHeader(persistedToken);

      const { data: currentUser } = await api.get('/users/current/full');

      set({
        user: currentUser,
        token: persistedToken,
        isLoggedIn: true,
      });
    } catch {
      clearAuthHeader();
      localStorage.removeItem('token');
      set({
        user: null,
        token: null,
        isLoggedIn: false,
      });
    } finally {
      set({ isRefreshing: false });
    }
  },

  updateUser: async (userData: {
    name?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  }) => {
    try {
      const { data } = await api.patch('/users/current/edit', userData);

      set((state) => ({
        user: state.user ? { ...state.user, ...data } : data,
      }));
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
  },

  removeUserPet: async (petId: string) => {
    set((state) => {
      if (!state.user) return state;

      return {
        ...state,
        user: {
          ...state.user,
          pets: state.user.pets.filter((pet) => pet._id !== petId),
        },
      };
    });
  },

  removeUserFavoriteNotice: async (id: string) => {
    set((state) => {
      if (!state.user || !state.user.noticesFavorites) return state;

      return {
        ...state,
        user: {
          ...state.user,
          noticesFavorites: state.user.noticesFavorites.filter((notice) => notice._id !== id),
        },
      };
    });
  },

  addUserFavoriteNotice: async (note: Note) => {
    set((state) => {
      if (!state.user) return state;

      const isAlreadyInFavorites = state.user.noticesFavorites.some((fav) => fav._id === note._id);
      if (isAlreadyInFavorites) return state;

      return {
        ...state,
        user: {
          ...state.user,
          noticesFavorites: [note, ...state.user.noticesFavorites],
        },
      };
    });
  },
}));

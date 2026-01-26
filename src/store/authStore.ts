import { create } from "zustand";
import { api, clearAuthHeader, setAuthHeader } from '../lib/api';
import type { AuthResponse, AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRefreshing: false,

  register: async (credentials) => {
    const { data } = await api.post<AuthResponse>('/users/signup', credentials);

    setAuthHeader(data.token);

    localStorage.setItem('token', data.token);

    set({
      user: { name: data.name, email: data.email },
      token: data.token,
      isLoggedIn: true,
    });
  },

  login: async (credentials) => {
    const { data } = await api.post<AuthResponse>('/users/signin', credentials);

    setAuthHeader(data.token);

    localStorage.setItem('token', data.token);

    set({
      user: { name: data.name, email: data.email },
      token: data.token,
      isLoggedIn: true,
    });
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

      const { data } = await api.get('users/current');

      set({
        user: data,
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
}));
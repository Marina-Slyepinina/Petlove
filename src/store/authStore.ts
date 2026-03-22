import { create } from 'zustand';
import { api, clearAuthHeader, setAuthHeader } from '../lib/api';
import type { AuthResponse, AuthState } from '../types/auth';

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
}));

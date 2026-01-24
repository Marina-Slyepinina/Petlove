import { create } from "zustand";
import { api, setAuthHeader } from "../lib/api";
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

  login: async () => {},
  logout: () => {},
  refreshUser: async () => {},
}));
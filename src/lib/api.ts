import axios from 'axios';
import type { Friend } from '../types/friends';

export const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
});

export const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
};

export const getFriends = async () => {
  const res = await api.get<Friend[]>('/friends');
  return res.data;
};

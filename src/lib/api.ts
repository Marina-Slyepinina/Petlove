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

export const getCategories = async () => {
  const res = await api.get<string[]>('/notices/categories');
  return res.data;
};

export const getSpecies = async () => {
  const res = await api.get<string[]>('/notices/species');
  return res.data;
};

export const getGenders = async () => {
  const res = await api.get<string[]>('/notices/sex');
  return res.data;
};

export const getLocations = async () => {
  const res = await api.get<string[]>('/cities/locations');
  return res.data;
};
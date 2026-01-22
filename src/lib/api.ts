import axios from "axios";

const api = axios.create({
  baseURL: 'https://petlove.b.goit.study/api',
});

export const setAuthHeader = (token: string) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
}

export const clearAuthHeader = () => {
  delete api.defaults.headers.common.Authorization;
}
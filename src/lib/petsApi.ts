import { api } from './api';

export const deletePet = async (petId: string) => {
  const res = await api.delete(`users/current/pets/remove/${petId}`);
  return res.data;
};

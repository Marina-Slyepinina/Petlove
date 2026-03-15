import type { Note, Pet } from './notices';

export interface UserBaseData {
  _id: string;
  name: string;
  email: string;
  token: string;
  noticesFavorites: Note[];
}

export interface UserFullData {
  _id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  token: string;
  noticesViewed: Note[];
  noticesFavorites: Note[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
}

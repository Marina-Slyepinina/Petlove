import { create } from 'zustand';
import type { Note, NoticeFilters } from '../types/notices';
import { api, getCategories, getGenders, getSpecies } from '../lib/api';

const defaultFilters: NoticeFilters = {
  keyword: '',
  category: '',
  sex: '',
  species: '',
  locationId: '',
  page: 1,
};

interface NoticesState {
  filters: NoticeFilters;
  notices: Note[];
  totalPages: number;
  isLoading: boolean;

  categories: string[];
  sexes: string[];
  species: string[];

  setFilters: (newFilters: Partial<NoticeFilters>) => void;
  resetFilters: () => void;
  fetchOptions: () => Promise<void>;
  fetchNotices: () => Promise<void>;
}

export const useNoticesStore = create<NoticesState>((set, get) => ({
  filters: defaultFilters,
  notices: [],
  totalPages: 1,
  isLoading: false,

  categories: [],
  sexes: [],
  species: [],

  fetchOptions: async () => {
    try {
      const [categories, sexes, species] = await Promise.all([
        getCategories(),
        getGenders(),
        getSpecies(),
      ]);
      set({
        categories,
        sexes,
        species,
      });
    } catch (error) {
      console.error(error);
    }
  },

  setFilters: (newFilters: Partial<NoticeFilters>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        page: 1,
        ...newFilters,
      },
    }));

    get().fetchNotices();
  },

  resetFilters: () => {
    set({ filters: defaultFilters });
    get().fetchNotices();
  },

  fetchNotices: async () => {
    set({ isLoading: true });
    const { filters } = get();

    try {
      const res = await api.get<{ results: Note[]; totalPages: number }>('notices', {
        params: filters,
      });
      set({
        notices: res.data.results,
        totalPages: res.data.totalPages,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

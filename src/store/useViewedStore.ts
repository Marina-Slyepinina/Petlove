import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Note } from '../types/notices';

interface ViewedStore {
  viewedNotices: Note[];
  addViewed: (note: Note) => void;
}

export const useViewedStore = create<ViewedStore>()(
  persist(
    (set) => ({
      viewedNotices: [],
      addViewed: (note: Note) =>
        set((state) => {
          const exists = state.viewedNotices.some((item) => item._id === note._id);
          if (exists) return state;

          const updated = [note, ...state.viewedNotices].slice(0, 20);
          return { viewedNotices: updated };
        }),
    }),
    { name: 'viewed-storage' },
  ),
);

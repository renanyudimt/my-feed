import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FeedStatesStore } from './types';
import { formatDate } from '@root/utils/formatDate';

export const useNewsStates = create<FeedStatesStore>()(
  persist(
    (set) => {
      const today = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);

      return {
        filters: {
          keyword: '',
          start_date: formatDate(thirtyDaysAgo),
          end_date: formatDate(today),
          author: '',
        },

        categories: [`world`],
        setFilters: (filters) => {
          set({ filters });
        },

        setCategories: (categories) => {
          set({ categories });
        },
      };
    },
    {
      name: `@news/feed-states`,
    },
  ),
);

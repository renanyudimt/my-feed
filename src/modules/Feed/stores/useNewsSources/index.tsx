import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NewsSorceStore } from './types';

export const useNewsSource = create<NewsSorceStore>()(
  persist(
    (set) => {
      return {
        sources: [
          {
            name: `The New York Times`,
            active: true,
            slug: `the-new-york-times`,
          },
          {
            name: `The Guardian`,
            active: true,
            slug: `the-guardian`,
          },
          {
            name: `News.org`,
            active: true,
            slug: `news-org`,
          },
          {
            name: `All`,
            active: true,
            slug: `all`,
          },
        ],
        toggleActiveSource: (slug) => {
          set((state) => {
            return {
              ...state,
              sources: state.sources.map((source) => {
                if (source.slug === slug) {
                  return {
                    ...source,
                    active: !source.active,
                  };
                }

                return source;
              }),
            };
          });
        },
      };
    },
    {
      name: `@news/sources`,
    },
  ),
);

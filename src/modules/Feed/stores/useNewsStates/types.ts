export type FeedFilters = {
  keyword: string;
  start_date: string | null;
  end_date: string | null;
  author: string;
};

export type FeedStatesStore = {
  filters: FeedFilters;
  categories: string[];
  setFilters: (filters: FeedFilters) => void;
  setCategories: (categories: string[]) => void;
};

export type AllowedSlugs = 'news-org' | 'the-guardian' | 'the-new-york-times' | 'all';

export type NewsSorceItem = {
  name: string;
  active: boolean;
  slug: AllowedSlugs;
};

export type NewsSorceStore = {
  sources: NewsSorceItem[];
  toggleActiveSource: (slug: string) => void;
};

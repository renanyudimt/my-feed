import { useInfiniteQuery } from '@tanstack/react-query';
import { FeedResponse, TheGuardianResponse, TheNewYorkTimesResponse, NewsApiResponse } from '@entities/Feed';
import { NewsSorceItem } from '@feed/stores/useNewsSources/types';
import { FeedFilters } from '@root/modules/Feed/stores/useNewsStates/types';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

const the_guardian_key = import.meta.env.VITE_GUARDIAN_API_KEY;
const news_org = import.meta.env.VITE_NEWS_API_KEY;
const nyt_key = import.meta.env.VITE_NEW_YORK_TIMES_KEY;

export const useFeedQuery = (params: {
  sources: NewsSorceItem[];
  filters: FeedFilters;
  categories: string[];
  news_slug: string | undefined;
}) => {
  const { sources, filters, categories, news_slug } = params;
  return useInfiniteQuery<FeedResponse>({
    queryKey: [
      'feed',
      {
        sources,
        filters,
        categories,
        news_slug,
      },
    ],
    queryFn: async ({ pageParam }) => {
      const allNews: FeedResponse = [];
      const formatDateToYYYYMMDD = (date: Date | null): string | null => {
        if (date instanceof Date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}${month}${day}`;
        }
        return null;
      };

      const formatDate = (date: Date | null): string | null => {
        if (date instanceof Date) {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        return null;
      };

      const fetchData = async (
        url: string,
        params: Record<string, string>,
        mapFn: (data: any) => FeedResponse,
        onError?: (e: any) => void,
      ) => {
        try {
          const fullUrl = new URL(url);
          fullUrl.search = new URLSearchParams(params).toString();
          const response: AxiosResponse = await axios.get(fullUrl.toString());

          return mapFn(response.data);
        } catch (e: any) {
          if (e?.response?.status === 429) {
            toast.error('You have exceeded the rate limit for this API, try again later');
          }
          onError && onError(e);
        }
      };

      const mapNYTData = (data: TheNewYorkTimesResponse): FeedResponse => {
        return data.response.docs.map((item) => {
          const image = item.multimedia?.find((item) => item.subtype === 'xlarge')?.url;
          return {
            id: item._id,
            title: item.headline.main,
            url: item.web_url,
            publishedAt: item.pub_date,
            source: 'the-new-york-times',
            category: item.section_name,
            description: item.abstract,
            image: image ? `https://static01.nyt.com/${image}` : '',
            author: item.byline.original,
          };
        });
      };

      const mapGuardianData = (data: TheGuardianResponse): FeedResponse => {
        return data.response.results.map((item) => ({
          id: item.id,
          title: item.webTitle,
          url: item.webUrl,
          publishedAt: item.webPublicationDate,
          source: 'the-guardian',
          category: item.sectionName,
          description: item.fields?.trailText,
          image: item.fields?.thumbnail,
          author: item.fields?.byline,
        }));
      };

      const mapNewsOrgData = (data: NewsApiResponse): FeedResponse => {
        // this api does not return the author and category
        return data.articles.map((item) => ({
          id: item.url,
          title: item.title,
          url: item.url,
          publishedAt: item.publishedAt,
          source: 'news-org',
          category: '',
          description: item.description,
          image: item.urlToImage,
        }));
      };

      return new Promise(async (resolve) => {
        const isTheGuardianActive = news_slug === `the-guardian`;
        const isTheNewYorkTimesActive = news_slug === `the-new-york-times`;
        const isNewsOrgActive = news_slug === `news-org`;
        const isAllActive = news_slug === `all`;

        if (isTheNewYorkTimesActive || isAllActive) {
          const correctCategoryName = (category: string): string => {
            const categoryMap: Record<string, string> = {
              business: 'Business Day',
              entertainment: 'Crosswords & Games',
            };

            return categoryMap[category] || category;
          };

          let fqFilter = '';

          if (filters.author) {
            fqFilter = `byline:("${filters.author}")`;
          } else if (categories.length > 0) {
            const sectionFilter = categories.map((cat) => `"${correctCategoryName(cat)}"`).join(' OR ');
            fqFilter = `section_name:(${sectionFilter})`;
          }

          // does not support search by author and category at the same time
          const paramsNYT = {
            q: filters.keyword,
            begin_date: formatDateToYYYYMMDD(new Date(filters.start_date as string)) as string,
            end_date: formatDateToYYYYMMDD(new Date(filters.end_date as string)) as string,
            sort: `newest`,
            page: String(pageParam),
            'api-key': nyt_key as string,
            ...(!!fqFilter && { fq: fqFilter }),
          };

          const nytData = (await fetchData(
            'https://api.nytimes.com/svc/search/v2/articlesearch.json',
            paramsNYT,
            mapNYTData,
          )) as FeedResponse;
          allNews.push(...nytData);
        }

        if ((isTheGuardianActive || isAllActive) && categories.length <= 1) {
          const correctCategoryName = (category: string): string => {
            const categoryMap: Record<string, string> = {
              sports: 'sport',
              health: 'healthcare-network',
              entertainment: 'games',
            };

            return categoryMap[category] || category;
          };

          const paramsTheGuardian = {
            q: filters.keyword,
            'order-by': `newest`,
            'from-date': formatDate(new Date(filters.start_date as string)) as string,
            'to-date': formatDate(new Date(filters.end_date as string)) as string,
            'page-size': '10',
            page: String(pageParam),
            'api-key': the_guardian_key as string,
            'show-fields': 'all',
            ...(filters.author && { byline: filters.author }),
            ...(categories.length > 0 && { section: correctCategoryName(categories[0]) }),
          };
          const guardianData = (await fetchData(
            'https://content.guardianapis.com/search',
            paramsTheGuardian,
            mapGuardianData,
          )) as FeedResponse;
          allNews.push(...guardianData);
        }

        if ((isNewsOrgActive || isAllActive) && categories.length <= 1) {
          const correctCategoryName = (category: string): string => {
            const categoryMap: Record<string, string> = {
              world: 'general',
            };

            return categoryMap[category] || category;
          };

          const paramsNewsOrg = {
            q: filters.keyword,
            ...(categories.length > 0 && { category: correctCategoryName(categories[0]) }),
            from: formatDate(new Date(filters.start_date as string)) as string,
            to: formatDate(new Date(filters.end_date as string)) as string,
            pageSize: '10',
            page: String(pageParam),
            apiKey: news_org as string,
            country: 'us',
          };
          const newsOrgData = (await fetchData(
            'https://newsapi.org/v2/top-headlines',
            paramsNewsOrg,
            mapNewsOrgData,
          )) as FeedResponse;
          allNews.push(...newsOrgData);
        }

        resolve(allNews);
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length >= 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: news_slug !== undefined,
  });
};

export type NewsApiResponse = {
  articles: {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    title: string;
    url: string;
    urlToImage: string;
  }[];
  status: string;
  totalResults: number;
};

export type TheNewYorkTimesResponse = {
  status: string;
  response: {
    docs: {
      abstract: string;
      web_url: string;
      snippet: string;
      byline: {
        original: string;
      };
      document_type: string;
      headline: {
        main: string;
      };
      lead_paragraph: string;
      multimedia: {
        subtype: string;
        width: number;
        height: number;
        url: string;
      }[];
      news_desk: string;
      pub_date: string;
      section_name: string;
      source: string;
      _id: string;
    }[];
  };
};

export type TheGuardianResult = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  fields: {
    body: string;
    bodyText: string;
    byline: string;
    bylineHtml: string;
    charCount: string;
    firstPublicationDate: string;
    headline: string;
    isInappropriateForSponsorship: string;
    isLive: string;
    isPremoderated: string;
    lang: string;
    lastModified: string;
    legallySensitive: string;
    main: string;
    newspaperEditionDate: string;
    newspaperPageNumber: string;
    productionOffice: string;
    publication: string;
    shortUrl: string;
    shouldHideAdverts: string;
    shouldHideReaderRevenue: string;
    showAffiliateLinks: string;
    showInRelatedContent: string;
    showTableOfContents: string;
    standfirst: string;
    thumbnail: string;
    trailText: string;
    wordcount: string;
  };
};

export type TheGuardianResponse = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: TheGuardianResult[];
  };
};

export type FeedResponse = {
  id: string;
  title: string;
  description?: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: string;
  category: string;
  author?: string;
}[];

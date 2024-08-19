import { Box, Button, Center, Flex, List, ListItem, Spinner, Text, useMediaQuery } from '@chakra-ui/react';
import { useFeedQuery } from '@services/Feed';
import { useCallback, useEffect, useMemo } from 'react';
import { useNewsSource } from '@feed/stores/useNewsSources';
import { useNewsStates } from '@feed/stores/useNewsStates';
import { FeedFilters } from '@feed/components/Filters';
import useInfiniteScroll from '@root/hooks/useInfiniteScroll';
import { useQueryClient } from '@tanstack/react-query';
import { ArticleCard } from '../../components/ArticleCard';
import { useSearchParams } from 'react-router-dom';

export const Feed = () => {
  const { sources } = useNewsSource();
  const { filters, categories } = useNewsStates();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get(`tab`);
  const findedSource = useMemo(() => sources.find((source) => source.slug === tab), [sources, tab]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { data, isPending, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useFeedQuery({
    sources,
    filters,
    categories,
    news_slug: tab || undefined,
  });

  const loaderRef = useInfiniteScroll(async () => {
    if (!isFetching && !isFetchingNextPage) await fetchNextPage();
  });

  const handleChangePanel = useCallback(
    (new_tab: string) => {
      setSearchParams({ tab: new_tab });

      queryClient.invalidateQueries({
        exact: true,
        queryKey: [
          'feed',
          {
            sources,
            filters,
            categories,
            new_tab,
          },
        ],
      });
    },
    [categories, filters, queryClient, sources],
  );

  useEffect(() => {
    if (!tab) {
      setSearchParams({
        tab: `the-new-york-times`,
      });
    }
  }, [tab]);

  return (
    <Flex h="100%" w="100%" p={[2, 4]} gap={[2, 4]} flexDir="column">
      <FeedFilters />
      <Flex display="flex" flexDir="row" gap={2}>
        {sources
          .filter((item) => item.active)
          .map((source) => (
            <Button
              variant={source.slug === tab ? 'solid' : 'outline'}
              flex={1}
              colorScheme="yellow"
              size="sm"
              key={source.slug}
              onClick={() => handleChangePanel(source.slug)}
            >
              {isMobile
                ? (() => {
                    if (source.slug === `the-new-york-times`) {
                      return `NYT`;
                    }

                    if (source.slug === `the-guardian`) {
                      return `TG`;
                    }

                    if (source.slug === `news-org`) {
                      return `News.org`;
                    }

                    return `All`;
                  })()
                : source.name}
            </Button>
          ))}
      </Flex>
      <Flex flex={1}>
        <Box h="100%" w="100%" position="relative" overflowY="auto">
          <Flex w="100%" h="100%" flexDir="column" gap={4} position="absolute" top={0} left={0}>
            <List gap={2} flex={1} overflow="auto" spacing={4}>
              {isPending && (
                <Center flex={1}>
                  <Spinner />
                </Center>
              )}
              {!isPending &&
                data?.pages &&
                data?.pages.flat()?.length > 0 &&
                data?.pages
                  .flat()
                  ?.filter((item) => {
                    return (
                      findedSource?.slug === `all` ||
                      findedSource?.slug === `news-org` ||
                      item.source === findedSource?.slug
                    );
                  })
                  ?.map((item) => {
                    return (
                      <ListItem key={item.id}>
                        <ArticleCard article={item} current_source_slug={findedSource?.slug as string} />
                      </ListItem>
                    );
                  })}
              {data?.pages.flat().length === 0 &&
                (findedSource?.slug === `news-org` || findedSource?.slug === `the-guardian`) &&
                categories.length <= 1 && (
                  <ListItem>
                    <Center>
                      <Text>{`No news found`}</Text>
                    </Center>
                  </ListItem>
                )}
              {data?.pages && data?.pages.flat().length > 0 && hasNextPage && (
                <ListItem>
                  <Center>
                    <Spinner color="primary.main" ref={loaderRef} />
                  </Center>
                </ListItem>
              )}
              {(findedSource?.slug === `news-org` || findedSource?.slug === `the-guardian`) &&
                categories.length > 1 && (
                  <ListItem>
                    <Flex align="center" justify="center" flex={1} h="100%">
                      <Text
                        fontWeight="bold"
                        fontStyle="italic"
                      >{`This API doesn't support multiple categories, please select only one category`}</Text>
                    </Flex>
                  </ListItem>
                )}
            </List>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

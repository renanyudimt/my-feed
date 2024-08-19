import {
  Heading,
  Image,
  Stack,
  Button,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Flex,
  Box,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { FeedResponse } from '@root/entities/Feed';
import { useNewsSource } from '@feed/stores/useNewsSources';
import { useNewsStates } from '@feed/stores/useNewsStates';

export const ArticleCard = ({
  article,
  current_source_slug,
}: {
  article: FeedResponse[0];
  current_source_slug: string;
}) => {
  const { sources } = useNewsSource();
  const { categories } = useNewsStates();
  const transformedDate = new Date(article.publishedAt).toLocaleDateString();
  const author = article.author ? `Author: ${article.author}` : '';
  const findedSource = sources.find((source) => source.slug === article.source);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
      {article.image && (
        <Image
          objectFit="cover"
          maxH={{ base: '200px', sm: '100%' }}
          maxW={{ base: '100%', sm: '200px' }}
          src={article.image}
          alt={article.title}
        />
      )}

      <Stack>
        <CardBody>
          <Flex flexDir="column">
            {(current_source_slug === `all` || isMobile) && findedSource && (
              <Box mb={2}>
                <Badge colorScheme="orange">{findedSource.name}</Badge>
              </Box>
            )}
            <Heading size="md">{article.title}</Heading>
            {article.description && <Text py="2">{article.description}</Text>}
            <Flex gap={2} flexDir={[`column`, `row`]}>
              <Text fontSize="small" fontStyle="italic">
                {`Published at: ${transformedDate}`}
              </Text>

              {author && (
                <Text fontSize="small" fontStyle="italic">
                  {author}
                </Text>
              )}
            </Flex>

            <Box mt={2}>
              <Badge colorScheme="green">{article.category || categories[0]}</Badge>
            </Box>
          </Flex>
        </CardBody>

        <CardFooter>
          <Button variant="link" colorScheme="blue" onClick={() => window.open(article.url, `_blank`)}>
            Read more
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

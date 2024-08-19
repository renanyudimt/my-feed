import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Header } from '../Header';

export const DefaultLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex w="100vw" h="100vh" flexDir="column" overflow="hidden">
      <Header />
      <Flex flex="1" justify="center" align="center">
        {children}
      </Flex>
    </Flex>
  );
};

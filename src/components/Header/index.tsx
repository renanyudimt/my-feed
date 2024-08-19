import { Button, Flex, Icon, Text, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from 'lucide-react';

export const Header = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Flex
      h="50px"
      _dark={{
        bg: 'gray.900',
        color: 'white',
      }}
      _light={{
        bg: 'gray.200',
        color: 'black',
      }}
      justify="center"
      align="center"
      zIndex="1"
      position="sticky"
      top="0"
    >
      <Flex justifyContent="space-between" flex={1} alignItems="center" px={6}>
        <Text fontWeight="bold">RYMT News</Text>
        <Button size="xs" variant="solid" colorScheme="blue" onClick={toggleColorMode}>
          {colorMode === 'light' ? <Icon as={MoonIcon} /> : <Icon as={SunIcon} />}
        </Button>
      </Flex>
    </Flex>
  );
};

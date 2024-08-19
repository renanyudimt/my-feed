import { Button, Flex, Menu, MenuButton, useDisclosure, Icon } from '@chakra-ui/react';
import { Settings, MenuSquare } from 'lucide-react';
import { useRef } from 'react';
import { LeftDrawer } from './LeftDrawer';
import { RightDrawer } from './RightDrawer';
import { useNewsStates } from '../../stores/useNewsStates';
export const FeedFilters = () => {
  const { isOpen: isOpenLeftDrawer, onOpen: onOpenLeftDrawer, onClose: onCloseLeftDrawer } = useDisclosure();
  const { isOpen: isOpenRightDrawer, onOpen: onOpenRightDrawer, onClose: onCloseRightDrawer } = useDisclosure();
  const { categories, filters } = useNewsStates();
  const btnLeftRef = useRef<HTMLButtonElement>(null);
  const btnRightRef = useRef<HTMLButtonElement>(null);

  const filtersCount = Object.values(filters).filter((value) => !!value).length;

  return (
    <Flex
      w="100%"
      p={2}
      _dark={{
        bg: 'gray.700',
        color: 'white',
      }}
      _light={{
        bg: 'gray.100',
        color: 'black',
      }}
      align="center"
      borderRadius={8}
      gap={[2, 4]}
    >
      <Menu>
        {() => (
          <>
            <MenuButton
              ref={btnLeftRef}
              size="sm"
              colorScheme="blue"
              isActive={isOpenLeftDrawer}
              as={Button}
              rightIcon={<Icon as={Settings} />}
              onClick={onOpenLeftDrawer}
            >
              {`Filters (${filtersCount - 2})`}
            </MenuButton>
            <LeftDrawer isOpen={isOpenLeftDrawer} onClose={onCloseLeftDrawer} btnRef={btnLeftRef} />
          </>
        )}
      </Menu>
      <Menu>
        {() => (
          <>
            <MenuButton
              ref={btnRightRef}
              size="sm"
              colorScheme="green"
              isActive={isOpenRightDrawer}
              as={Button}
              rightIcon={<Icon as={MenuSquare} />}
              onClick={onOpenRightDrawer}
            >
              {`Categories (${categories.length})`}
            </MenuButton>
            <RightDrawer btnRef={btnRightRef} isOpen={isOpenRightDrawer} onClose={onCloseRightDrawer} />
          </>
        )}
      </Menu>
    </Flex>
  );
};

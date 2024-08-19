import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
} from '@chakra-ui/react';
import { RefObject, useState } from 'react';
import { mocked_sections } from '@feed/mock/sections';
import { useNewsStates } from '@root/modules/Feed/stores/useNewsStates';

export const RightDrawer = ({
  isOpen,
  onClose,
  btnRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  btnRef: RefObject<HTMLButtonElement>;
}) => {
  const { categories, setCategories } = useNewsStates();
  const [selectedCategories, setSelectedCategories] = useState<(string | number)[]>(categories);

  const handleSave = () => {
    setCategories(selectedCategories as string[]);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Categories</DrawerHeader>

        <DrawerBody>
          <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
            <Stack spacing={[2, 4]} direction="column">
              {mocked_sections.map((section) => (
                <Checkbox key={section.value} value={section.value}>
                  {section.label}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

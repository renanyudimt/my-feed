import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import { FormBuilder } from '@root/components/FormBuilder';
import { useNewsStates } from '@root/modules/Feed/stores/useNewsStates';
import { RefObject, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LeftDrawerForm } from './types';
import * as yup from 'yup';
import { formatDate } from '@root/utils/formatDate';
import { yupResolver } from '@hookform/resolvers/yup';

const isValidDate = (value: string) => {
  if (value === null) return false;
  if (typeof value === 'string') {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(value)) {
      return false;
    }
    const [month, day, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }
  return false;
};

const resolver = yup.object().shape({
  keyword: yup.string().default(''),
  author: yup.string().default(''),
  start_date: yup
    .string()
    .required('Start Date is required')
    .test('is-valid-date', 'Start Date must be a valid date or in MM/DD/YYYY format', isValidDate),
  end_date: yup
    .string()
    .required('End Date is required')
    .test('is-valid-date', 'End Date must be a valid date or in MM/DD/YYYY format', isValidDate),
});

export const LeftDrawer = ({
  btnRef,
  isOpen,
  onClose,
}: {
  btnRef: RefObject<HTMLButtonElement>;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { control, reset, handleSubmit } = useForm<LeftDrawerForm>({
    resolver: yupResolver(resolver),
  });
  const { filters, setFilters } = useNewsStates();
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const resetForm = useCallback(() => {
    reset({
      keyword: filters.keyword,
      author: filters.author,
      start_date: filters.start_date as string,
      end_date: filters.end_date as string,
    });
  }, [reset, filters]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onSubmit = (data: LeftDrawerForm) => {
    setFilters({
      keyword: data.keyword,
      author: data.author,
      start_date: formatDate(new Date(data.start_date as string)),
      end_date: formatDate(new Date(data.end_date as string)),
    });
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={handleClose} finalFocusRef={btnRef} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filters</DrawerHeader>

        <DrawerBody>
          <Flex flexDir="column" gap={[2, 4]}>
            <FormBuilder
              control={control}
              schema={[
                {
                  key: `keyword`,
                  elementType: 'text',
                  label: 'Search by Keyword',
                  props: {
                    variant: `outline`,
                  },
                },
                {
                  key: `author`,
                  elementType: 'text',
                  label: 'Author',
                  props: {
                    variant: `outline`,
                  },
                },
                {
                  key: `start_date`,
                  elementType: 'datepicker',
                  label: 'Start Date',
                  props: {
                    variant: `outline`,
                    minDate: thirtyDaysAgo,
                    maxDate: today,
                  },
                },
                {
                  key: `end_date`,
                  elementType: 'datepicker',
                  label: 'End Date',
                  props: {
                    variant: `outline`,
                    minDate: thirtyDaysAgo,
                    maxDate: today,
                  },
                },
              ]}
            />
          </Flex>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={handleClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

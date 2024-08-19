import DatePicker from 'react-datepicker';
import { FormControl, Box, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useController, FieldValues } from 'react-hook-form';
import { ptBR } from 'date-fns/locale';
import './styles.css';

import { DatePickerInput } from './DatePickerInput';
import { formatDate } from '@root/utils/formatDate';

export const ReactDatePicker = <TFieldValues extends FieldValues>(props: TFieldValues) => {
  const { name, control, isDisabled, label, showTimeSelect = false, variant, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const handleDateChange = (date: Date | null) => {
    if (!date) {
      field.onChange(null);
      return;
    }
    field.onChange(formatDate(date));
  };

  return (
    <FormControl isInvalid={!!error || false} width="100%" height="100%" px={1}>
      {label && <FormLabel>{label}</FormLabel>}

      <Box>
        <DatePicker
          disabled={isDisabled}
          value={field.value || undefined}
          onBlur={field.onBlur}
          selected={field.value || undefined}
          onChange={handleDateChange}
          customInput={<DatePickerInput variant={variant} />}
          showTimeSelect={showTimeSelect}
          locale={ptBR}
          dateFormat={showTimeSelect ? 'MM/dd/yyyy HH:mm' : 'MM/dd/yyyy'}
          wrapperClassName="custom-react-datepicker-wrapper"
          ref={field.ref}
          {...rest}
        />
      </Box>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

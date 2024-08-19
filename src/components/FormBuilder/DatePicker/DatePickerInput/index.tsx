import { Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { forwardRef } from 'react';
import { Calendar } from 'lucide-react';

export const DatePickerInput = forwardRef<HTMLInputElement, FieldValues>((props, ref) => {
  const { variant } = props;

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Icon as={Calendar} />
      </InputLeftElement>
      <Input ref={ref} {...props} isReadOnly variant={variant} />
    </InputGroup>
  );
});

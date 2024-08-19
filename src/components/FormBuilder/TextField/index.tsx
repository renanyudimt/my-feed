import { FieldValues, useController } from 'react-hook-form';

import { Input, InputGroup, FormControl, FormLabel } from '@chakra-ui/react';
import { TextFieldProps } from './types';

export const TextField = <TFieldValues extends FieldValues & TextFieldProps>(props: TFieldValues) => {
  const {
    control,
    name,
    rules = {},
    variant = `flushed`,
    icon,
    rightIcon,
    leftAddon = false,
    rightAddon = false,
    isLoading = false,
    isDisabled = false,
    isReadOnly = false,
    onInputChange,
    defaultValue,
    label,
    size = `md`,
    type = `text`,
    ...rest
  } = props;
  const {
    field,
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultValue || ``,
  });

  return (
    <FormControl isInvalid={invalid} width="100%" height="100%" px={1}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup size={size}>
        <Input
          {...rest}
          fontSize={{
            sm: `sm`,
            md: `sm`,
            lg: `sm`,
            xl: `sm`,
          }}
          ref={field.ref}
          name={name}
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
          variant={variant}
          onBlur={field.onBlur}
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
          }}
        />
      </InputGroup>
    </FormControl>
  );
};

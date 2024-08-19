import { Checkbox as ChakraCheckbox, FormControl, Text, Tooltip } from '@chakra-ui/react';
import { FieldValues, useController } from 'react-hook-form';
import { CheckboxProps } from './types';

export const Checkbox = <TFieldValues extends FieldValues & CheckboxProps>(props: TFieldValues) => {
  const { control, name, variant = `flushed`, label, value, getValues, ...rest } = props;
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const values = getValues();
  const target = values[name];

  const handleChecked = () => {
    if (!target) return;

    const newTarget = target?.includes(value)
      ? target?.filter((item: string) => item !== value)
      : [...target, value];

    field.onChange(newTarget);
  };

  return (
    <FormControl isInvalid={!!error || false} width="100%" height="100%" px={1}>
      <ChakraCheckbox
        {...rest}
        ref={field.ref}
        isChecked={Array.isArray(target) ? target?.includes(value) : false}
        variant={variant}
        value={value}
        onChange={handleChecked}
      >
        <Tooltip label={label}>
          <Text isTruncated as="span">
            {label}
          </Text>
        </Tooltip>
      </ChakraCheckbox>
    </FormControl>
  );
};

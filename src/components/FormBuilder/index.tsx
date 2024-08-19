import { Fragment } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import { TextField } from './TextField';
import { Checkbox } from './Checkbox';
import { ReactDatePicker } from './DatePicker';

import { Schema } from './types';

export const FormBuilder = <T extends FieldValues>({ schema, control }: { schema: Schema; control: Control<T> }) => {
  return (
    <>
      {schema.map((item) => {
        return (
          <Fragment key={item.key}>
            {item.elementType === `checkbox` && (
              <Checkbox {...item.props} name={item.key} control={control} label={item.label} />
            )}
            {item.elementType === `text` && (
              <TextField {...item?.props} name={item.key} label={item.label} control={control} icon={item.icon} />
            )}

            {item.elementType === `datepicker` && (
              <ReactDatePicker {...item.props} control={control} name={item.key} label={item.label} />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

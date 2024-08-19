import { ReactNode } from 'react';

export type Schema = SchemaItem[];

export type SchemaItem = {
  key: string;
  label?: string;

  elementType:
    | `text`
    | `textarea`
    | `select`
    | `creatable`
    | `tags`
    | `password`
    | `checkbox`
    | `combobox`
    | `datepicker`
    | `currency`
    | `switch`
    | `radio`
    | `phone`;
  defaultValue?: string;
  rules?: {
    required?: string | boolean;
    pattern?: {
      value: RegExp;
      message: string;
    };
  };
  props?: {
    [key: string]: unknown;
    options?: Option[];
    isMulti?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isLoading?: boolean | string | undefined | null;
    onClickCallback?: (suggestion: Option) => void;
    onInputChange?: (value: string) => void;
    creatable?: boolean;
    unclearble?: boolean;
    type?: `number` | `password` | `phone` | `email` | `text`;
  };
  icon?: JSX.Element | ReactNode;
};

export type Option = {
  value: string | number;
  label: string;
  subtitle?: string;
};

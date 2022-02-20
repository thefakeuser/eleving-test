export enum ButtonSizes {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonColors {
  Primary = 'primary',
  Secondary = 'secondary',
  Main = 'main',
  White = 'white',
  Light = 'light',
  Disabled = 'disabled',
  Grey = 'grey'
}

export enum ButtonType {
  Outlined = 'outlined',
  Text = 'text',
  Default = 'default'
}

export enum CheckboxLabelPosition {
  Right = 'right',
  Left = 'left'
}

export interface SelectOption {
  text: string;
  value: string | number | boolean | null | undefined;
}

export interface OptionTextValue {
  option: SelectOption;
  value?: string | number | null;
}

export enum TextInputTypes {
  Text = 'text',
  Number = 'number'
}

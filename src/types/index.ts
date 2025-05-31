export type Transformer = {
  assetId: number;
  name: string;
  region: string;
  health: string;
  lastTenVoltgageReadings: VoldateReading[];
}

type VoldateReading = {
  timestamp: string;
  voltage: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string
}

type Column<T> = {
  key: string;
  title: string;
  render: (row: T) => React.ReactNode;
};

interface BaseFieldProps {
  id?: string;
  name: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  fieldClassName?: string;
}

export interface TextFieldProps extends BaseFieldProps {
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface CheckboxFieldProps extends BaseFieldProps {
  checked: boolean;
}
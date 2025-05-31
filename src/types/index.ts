export type Transformer = {
  assetId: number;
  name: string;
  region: string;
  health: string;
  lastTenVoltgageReadings: VoltageReading[];
}

type VoltageReading = {
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
  labelClassName?: string;
  fieldClassName?: string;
}

export interface TextFieldProps extends BaseFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface CheckboxFieldProps extends BaseFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export interface ChartProps {
  data: Transformer[];
}

export interface TransformerTableProps {
  data: Transformer[];
};

export interface SearchInputProps {
  onSearch: (term: string) => void;
  placeholder?: string;
};

export type Option = {
  label: string;
  value: string;
};

export interface SelectProps extends BaseFieldProps {
  value: string;
  options: Option[];
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

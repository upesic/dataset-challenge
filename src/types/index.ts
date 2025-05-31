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

import type { Transformer } from '../types';
import DataTable from './DataTable';

interface TransformerTableProps {
  data: Transformer[];
};

const TransformerTable = ({ data }: TransformerTableProps) => {
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (transformer: Transformer) => transformer.name
    },
    {
      key: "region",
      title: "Region",
      render: (transformer: Transformer) => transformer.region
    },
    {
      key: "health",
      title: "Health",
      render: (transformer: Transformer) => transformer.health
    }
  ];

  return (
    <DataTable<Transformer>
      data={data}
      columns={columns}
      className={'transformer-table'}
    />
  );
};

export default TransformerTable;
import type { Transformer, TransformerTableProps } from '../types';
import DataTable from './DataTable';

const TransformerTable: React.FC<TransformerTableProps> = ({ data }) => {
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
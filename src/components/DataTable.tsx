import type { DataTableProps } from '../types';

const DataTable = <T,>({
  data,
  columns,
  className = ''
}: DataTableProps<T>) => {
  return (
    <div className={`mt-2 ${className}`}>
      <table className="min-w-full table-auto md:table-fixed text-sm shadow-md rounded-[5px]">
        <thead>
          <tr className="text-left font-bold text-sm bg-[#D0D0D0] text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`py-2 px-4`}
              >
                <div className="flex items-center justify-between">
                  <span>{col.title}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td>No data</td></tr> : data.map((row: T, index: number) => (
            <tr key={index} className={`border-t border-[#D8D8D8]`}>
              {columns.map((col) => (
                <td key={col.key} className="py-2 px-4 text-sm font-semibold">
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};

export default DataTable;
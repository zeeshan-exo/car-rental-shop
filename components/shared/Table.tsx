import { ReactNode } from "react";

interface Column {
    label: string, 
    key?: string,
    render?:  (row: Record<string, any>) => ReactNode;
  }

interface TableProps {
    columns: Column[],
    data: Array<Record<string, any>>,
    title?: string
  }


  
  const CustomTable = ({ columns, data, title }: TableProps) => {
    return (
      <div className="bg-white rounded-md shadow">
        {title && (
          <div className="px-6 py-4 border-b border-gray-200">
            <p className="text-lg font-medium text-gray-700">{title}</p>
          </div>
        )}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs uppercase bg-gray-100">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-3">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {column.render ? column.render(row) : row[column.key ?? ""] ?? "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default CustomTable;
import { Pencil, CircleX } from "lucide-react";

type TableColumn = {
  header: string;
  accessor: string;
};

type TableProps<T> = {
  columns: TableColumn[];
  data: T[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
};

export const Table = <T,>({
  columns,
  data,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  const accessData = (item: T, column: TableColumn) => {
    const keyList = column.accessor.split(".");
    var value;
    for (let i = 0; i < keyList.length; i++) {
      value = item[keyList[i] as keyof T];
    }
    return value;
  };
  return (
    <table className="w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.accessor}
              className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {column.header}
            </th>
          ))}
          <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Edit
          </th>
          <th className="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Delete
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.accessor}
                className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500"
              >
                {/* {String((item as any)[column.accessor])} */}
                {}
              </td>
            ))}
            <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
              <Pencil
                className="h-4 hover:cursor-pointer"
                onClick={() => onEdit(index)}
              />
            </td>
            <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
              <CircleX
                className="h-4 hover:cursor-pointer"
                color="red"
                onClick={() => onDelete(index)}
              />
            </td>
          </tr>
        ))}
        {/* {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td
                key={column.accessor}
                className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500"
              >
                {String((item as any)[column.accessor])}
              </td>
            ))}
            <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
              <Pencil
                className="h-4 hover:cursor-pointer"
                onClick={() => onEdit(index)}
              />
            </td>
            <td className="p-2 overflow-hidden whitespace-nowrap text-sm text-gray-500">
              <CircleX
                className="h-4 hover:cursor-pointer"
                color="red"
                onClick={() => onDelete(index)}
              />
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

import { TableCell } from "./TableCell";

export const TableHead = ({ columns = [] }) => {
  return (
    <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
      <tr>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            lable={col.lable}
            width={col.width}
            icon={col.icon}
          ></TableCell>
        ))}
      </tr>
    </thead>
  );
};

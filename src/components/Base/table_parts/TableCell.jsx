export const TableCell = ({ lable, width, icon }) => {
  return (
    <th scope="col" className={`px-6 py-4 text-right ${width}`}>
      <div className="flex items-center gap-1">
        <div className="cursor-pointer">{icon}</div>
        {lable}
      </div>
    </th>
  );
};

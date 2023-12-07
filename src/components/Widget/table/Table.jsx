import { TableHead } from "../../Base";
export const Table = ({ children, columns }) => {
  return (
    <div className="flex flex-col h-[24rem]">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full text-sm font-light text-start text-orange-500 ">
              <TableHead columns={columns}></TableHead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { OutlineButton, Pagination, Table } from "../components";
import { useGetQuantityOfProducts } from "../api";

const PanelQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const TRowsPerPage = 4;

  const [products, totalPages, total] = useGetQuantityOfProducts(
    currentPage,
    TRowsPerPage
  );
  const handlePageChange = (page) => setCurrentPage(page);

  const columns = [
    {
      id: 1,
      lable: "کالا",
      width: "w-[50%]",
    },
    {
      id: 2,
      lable: "قیمت",
      width: "w-[25%]",
    },
    {
      id: 3,
      lable: "موجودی",
      width: "w-[25%]",
    },
  ];

  return (
    <div className="w-4/5 mx-auto mt-12">
      <div className="flex items-center justify-between mb-2 ml-4">
        <h1 className="mr-4 text-xl text-orange-500 font-bold">
          مدیریت موجودی و قیمت ها
        </h1>
        {/* <ButtonContaind bgColorLight="bg-green-500" textColor="text-white">
          ذخیره
        </ButtonContaind> */}
        <OutlineButton
          bordercolorDark="border-green-700"
          bordercolorLight="border-green-500"
          textcolorDark="text-green-700"
          textcolorLight="text-green-500"
        >
          ذخیره
        </OutlineButton>
      </div>
      <Table columns={columns}>
        {Array.isArray(products) &&
          products?.map((row, index) => (
            <tr
              key={row._id}
              className={`bg-neutral-100 dark:border-neutral-500 text-orange-200 ${
                index % 2 === 0 ? "dark:bg-neutral-700" : "dark:bg-neutral-600"
              }  `}
            >
              <td className="whitespace-nowrap px-6 py-4 h-[4.3rem]">
                {row.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4 h-[4.3rem]">
                {row.price.toLocaleString("fa")} تومان
              </td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4 h-[4.3rem]">
                {row.quantity}
              </td>
            </tr>
          ))}
      </Table>

      <Pagination
        total={total}
        TRowsPerPage={TRowsPerPage}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PanelQuantity;

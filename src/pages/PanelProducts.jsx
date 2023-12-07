import { useState } from "react";
import { GetCategoryById, useGetAllProducts, GetSubcategoryById } from "../api";
import { OutlineButton, Pagination, SelectBox, Table } from "../components";

const PanelProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const TRowsPerPage = 4;

  const [products, total, total_pages] = useGetAllProducts(
    currentPage,
    TRowsPerPage,
    selectedCategory
  );

  const handlePageChange = (page) => setCurrentPage(page);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const columns = [
    {
      id: 1,
      lable: "تصویر",
      width: "w-[10%]",
    },
    {
      id: 2,
      lable: "نام کالا",
      width: "w-[35%]",
    },
    {
      id: 3,
      lable: <SelectBox onCategoryChange={handleCategoryChange} />,
      width: "w-[35%]",
    },
    {
      id: 4,
      lable: "",
      width: "w-[20%]",
    },
  ];

  return (
    <div className="w-4/5 mx-auto mt-12">
      <div className="flex items-center justify-between mb-2 ml-4">
        <h1 className="mr-4 text-xl text-orange-500 font-bold">
          مدیریت کالاها
        </h1>
        <OutlineButton
          bordercolorDark="border-green-700"
          bordercolorLight="border-green-500"
          textcolorDark="text-green-700"
          textcolorLight="text-green-500"
        >
          افزودن کالا
        </OutlineButton>
      </div>
      <Table columns={columns}>
        {Array.isArray(products) &&
          products.map((row, index) => (
            <tr
              key={row._id}
              className={`bg-neutral-100 dark:border-neutral-500 text-orange-200 ${
                index % 2 === 0 ? "dark:bg-neutral-700" : "dark:bg-neutral-600"
              }  `}
            >
              <td className="whitespace-nowrap px-4 font-medium">
                <div>
                  <img
                    alt="thumbnail"
                    src={`http://localhost:8000/images/products/thumbnails/${row.thumbnail}`}
                    className="rounded-lg"
                  />
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">{row.name}</td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4">
                <GetCategoryById categoryId={row.category} />
                <span> / </span>
                <GetSubcategoryById subCategoryId={row.subcategory} />
              </td>
              <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                <OutlineButton
                  className="ml-4"
                  bordercolorLight="border-orange-600"
                  bordercolorDark="border-orange-700"
                  textcolorLight="text-orange-600"
                  textcolorDark="text-orange-700"
                >
                  ویرایش
                </OutlineButton>

                <OutlineButton
                  bordercolorLight="border-red-600"
                  bordercolorDark="border-red-700"
                  textcolorLight="text-red-600"
                  textcolorDark="text-red-700"
                >
                  حذف
                </OutlineButton>
              </td>
            </tr>
          ))}
      </Table>
      <Pagination
        TRowsPerPage={TRowsPerPage}
        total={total}
        totalPages={total_pages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PanelProducts;

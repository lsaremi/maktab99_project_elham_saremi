import { useEffect, useState } from "react";
import { OutlineButton, Pagination, Table } from "../components";
import { useGetQuantityOfProducts } from "../api";
import { PRODUCTS_URL } from "../config";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { instance } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PanelQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editedValues, setEditedValues] = useState({});

  const TRowsPerPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);

  const [products, totalPages, total] = useGetQuantityOfProducts(
    currentPage,
    TRowsPerPage
  );

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setEditedValues({});
        setShowToast(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  //edit mutation ...
  const editProduct = useMutation({
    mutationFn: (editedRows) => {
      const updatePromises = editedRows.map((row) => {
        const { id, ...updates } = row;
        return instance.patch(`${PRODUCTS_URL}/${id}`, updates);
      });

      return Promise.all(updatePromises);
    },
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["panelQuantityData"] });
      toast.success(" به درستی ویرایش شد 🤩", {
        autoClose: 2000,
        theme: "dark",
      });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(" ویرایش نشد 😒", {
        autoClose: 2000,
        theme: "dark",
      });
    },
  });

  const handleSave = async () => {
    try {
      const editedRows = Object.entries(editedValues)
        .filter(([values]) => Object.keys(values).length > 0)
        .map(([rowId, values]) => ({ id: rowId, ...values }));

      await editProduct.mutateAsync(editedRows);

      setEditedValues({});
      setShowToast(true);
    } catch (error) {
      console.error("Error during save:", error);
    }
  };

  const onChangeInput = (e, rowId) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({
      ...prev,
      [rowId]: { ...prev[rowId], [name]: value },
    }));
  };

  const columns = [
    {
      id: 1,
      lable: "کالا",
      width: "w-[40%]",
    },
    {
      id: 2,
      lable: "قیمت (تومان)",
      width: "w-[35%]",
    },
    {
      id: 3,
      lable: "موجودی",
      width: "w-[25%]",
    },
  ];

  return (
    <>
      <div className="w-4/5 mx-auto">
        <div className="flex items-center justify-between mb-2 ml-4 h-20">
          <h1 className="mr-4 text-xl text-orange-500 font-bold">
            مدیریت موجودی و قیمت ها
          </h1>

          {Object.keys(editedValues).length !== 0 && (
            <OutlineButton
              bordercolorDark="border-green-700"
              bordercolorLight="border-green-500"
              textcolorDark="text-green-700"
              textcolorLight="text-green-500"
              onClick={() => handleSave()}
            >
              ذخیره
            </OutlineButton>
          )}
        </div>
        <Table columns={columns}>
          {Array.isArray(products) &&
            products?.map((row, index) => (
              <tr
                key={row._id}
                className={`bg-neutral-100 dark:border-neutral-500 text-orange-200 ${
                  index % 2 === 0
                    ? "dark:bg-neutral-700"
                    : "dark:bg-neutral-600"
                }  `}
              >
                <td className="whitespace-nowrap px-6 py-4 h-[4.3rem]">
                  {row.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 h-[4.3rem] relative">
                  <input
                    type="number"
                    name="price"
                    className="bg-transparent relative"
                    value={editedValues[row._id]?.price || row.price}
                    onChange={(e) => onChangeInput(e, row._id)}
                    placeholder="قیمت رو وارد کن..."
                  />
                </td>
                <td className="whitespace-nowrap pr-10 pl-6 py-4 h-[4.3rem]">
                  <input
                    type="number"
                    className="bg-transparent"
                    name="quantity"
                    value={editedValues[row._id]?.quantity || row.quantity}
                    onChange={(e) => onChangeInput(e, row._id)}
                    placeholder="موجودی رو وارد کن..."
                  />
                </td>
              </tr>
            ))}
        </Table>
        {showToast && <ToastContainer />}

        <Pagination
          total={total}
          TRowsPerPage={TRowsPerPage}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PanelQuantity;

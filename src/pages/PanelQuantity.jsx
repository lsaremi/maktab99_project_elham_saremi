import { useEffect, useState } from "react";
import { OutlineButton, Pagination, Table } from "../components";
import { useGetQuantityOfProducts } from "../api";
import { PRODUCTS_URL } from "../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PanelQuantity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editedValues, setEditedValues] = useState({});
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();
  const TRowsPerPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);

  // const [products, totalPages, total] = useGetQuantityOfProducts(
  //   currentPage,
  //   TRowsPerPage
  // );

  const removeItemFromEditedValues = (rowId) => {
    setEditedValues((prev) => {
      const { [rowId]: deletedItem, ...rest } = prev;
      return rest;
    });
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["panelQuantityData", currentPage],
    queryFn: () =>
      instance
        .get(`${PRODUCTS_URL}?page=${currentPage}&limit=${TRowsPerPage}`)
        .then((res) => res.data),
    keepPreviousData: true,
    staleTime: 60000,
  });
  const products = data?.data?.products;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        const rowId = event.target.id;
        if (editedValues[rowId]) {
          removeItemFromEditedValues(rowId);
        }

        setShowToast(false);
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [editedValues, products, removeItemFromEditedValues]);

  //edit mutation ...
  const editProduct = useMutation({
    mutationFn: (editedRows) => {
      const updatePromises = editedRows.map((row) => {
        const { id, ...updates } = row;
        return instance.patch(`${PRODUCTS_URL}/${id}`, updates);
      });

      return Promise.all(updatePromises);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["panelQuantityData"] });
      setEditedValues({});
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
        .map(([rowId, values]) => ({
          id: rowId.substring(1),
          ...values,
        }));

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

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
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
          {Array.isArray(data?.data.products) &&
            data?.data.products?.map((row, index) => (
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
                    id={`p${row._id}`}
                    name="price"
                    className={`${
                      editedValues[`p${row._id}`]
                        ? "border-2 border-gray-500 py-1 pr-1"
                        : ""
                    } bg-transparent `}
                    value={editedValues[`p${row._id}`]?.price || row.price}
                    onChange={(e) => onChangeInput(e, `p${row._id}`)}
                    placeholder="قیمت رو وارد کن..."
                  />
                </td>
                <td className="whitespace-nowrap pr-10 pl-6 py-4 h-[4.3rem]">
                  <input
                    id={`q${row._id}`}
                    type="number"
                    className={`${
                      editedValues[`q${row._id}`]
                        ? "border-2 border-gray-500 py-1 pr-1"
                        : ""
                    } bg-transparent `}
                    name="quantity"
                    value={
                      editedValues[`q${row._id}`]?.quantity || row.quantity
                    }
                    onChange={(e) => onChangeInput(e, `q${row._id}`)}
                    placeholder="موجودی رو وارد کن..."
                  />
                </td>
              </tr>
            ))}
        </Table>
        {showToast && <ToastContainer />}

        <Pagination
          total={data.total}
          TRowsPerPage={TRowsPerPage}
          totalPages={data.total_pages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PanelQuantity;

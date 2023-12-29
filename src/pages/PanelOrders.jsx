import { useState } from "react";
import { GetUserById, instance, useGetOrders } from "../api";
import { OutlineButton, Pagination, RadioButton, Table } from "../components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { ORDERS_URL } from "../config";
import { CheckOrderModal, Spinner } from "../common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PanelOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [delivered, setDelivered] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const TRowsPerPage = 4;

  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [orderId, setOrderId] = useState("");
  const [orders, totalPages, total] = useGetOrders(
    currentPage,
    TRowsPerPage,
    delivered
  );

  const handlePageChange = (page) => setCurrentPage(page);

  // get order
  const { isPending, error, data } = useQuery({
    queryKey: ["orderData", orderId],
    queryFn: () =>
      instance.get(`${ORDERS_URL}/${orderId}`).then((res) => res.data),
  });

  //edit mutation ...
  const editOrder = useMutation({
    mutationFn: () => {
      return instance.patch(`${ORDERS_URL}/${orderId}`, {
        deliveryStatus: true,
      });
    },
    onMutate: () => {
      setSpinner(true);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["orderData"] });
      setOrderId(null);

      console.log("ویرایش شد");
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSettled: () => {
      setSpinner(false);
    },
  });

  const handleDeliveredFilter = () => {
    setDelivered(true);
    setCurrentPage(1);
  };

  const handlePendingFilter = () => {
    setDelivered(false);
    setCurrentPage(1);
  };

  const handleShowCheckOrderModal = (id) => {
    setOrderId(id);
    // console.log(id);
    setShowModal(true);
  };

  const handleDeliveryStatus = () => {
    editOrder.mutate();
  };

  if (isPending) return <Spinner />;

  if (error) return `An error has occurred: ${error.message}`;

  const columns = [
    {
      id: 1,
      lable: "نام کاربر",
      width: "w-[25%]",
    },
    {
      id: 2,
      lable: "مجموع مبلغ",
      width: "w-[25%]",
    },
    {
      id: 3,
      lable: "زمان ثبت سفارش",
      width: "w-[25%]",
      icon:
        sortDirection === "asc" ? (
          <IoMdArrowDropdown
            className="text-2xl"
            onClick={() => setSortDirection("desc")}
          />
        ) : (
          <IoMdArrowDropup
            className="text-2xl"
            onClick={() => setSortDirection("asc")}
          />
        ),
    },
    {
      id: 4,
      lable: "",
      width: "w-[25%]",
    },
  ];

  return (
    <div className="w-4/5 mx-auto">
      <div className="flex gap-4 items-center justify-between mb-2 ml-4">
        <h1 className="mr-4 text-xl text-orange-500 font-bold">
          مدیریت سفارش ها
        </h1>
        <div>
          <RadioButton
            checked={delivered}
            id="deliverd"
            onFilter={handleDeliveredFilter}
          >
            سفارش های تحویل شده
          </RadioButton>
          <RadioButton
            checked={!delivered}
            id="pending"
            onFilter={handlePendingFilter}
          >
            سفارش های در انتظار ارسال
          </RadioButton>
        </div>
      </div>

      <Table columns={columns}>
        {Array.isArray(orders) &&
          orders
            .sort((a, b) => {
              const firstDate = new Date(a.createdAt).getTime();
              const secondDate = new Date(b.createdAt).getTime();
              return sortDirection === "asc"
                ? secondDate - firstDate
                : firstDate - secondDate;
            })
            .map((row, index) => (
              <tr
                key={row._id}
                className={`bg-neutral-100 dark:border-neutral-500 text-orange-200  ${
                  index % 2 === 0
                    ? "dark:bg-neutral-700"
                    : "dark:bg-neutral-600"
                }  `}
              >
                <td className="whitespace-nowrap px-6 py-4">
                  <GetUserById userId={row.user} />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {row.totalPrice.toLocaleString("fa")} تومان
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(row.createdAt).toLocaleDateString("fa")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-center">
                  <OutlineButton
                    className="ml-4"
                    bordercolorLight="border-green-600"
                    bordercolorDark="border-green-700"
                    textcolorLight="text-green-400"
                    textcolorDark="text-green-500"
                    onClick={() => handleShowCheckOrderModal(row._id)}
                  >
                    بررسی سفارش
                  </OutlineButton>
                </td>
              </tr>
            ))}
      </Table>
      <Pagination
        TRowsPerPage={TRowsPerPage}
        total={total}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {showModal && (
        <CheckOrderModal
          delivered={delivered}
          data={data}
          onEditDeliveryStatus={handleDeliveryStatus}
          // onChangeDeliveredStatus={setDelivered(true)}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PanelOrders;

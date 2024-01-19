import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OutlineButton, Pagination, Table } from "../components";
import { removeProductFromCart } from "../features/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeleteModal } from "../common";
import { CHECKOUT_ROUTE, HOME_ROUTE } from "../config";

const Basket = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const lengthOfBasket = cartState.length;
  const navigate = useNavigate();

  const [selectedProductForDelete, setSelectedProductForDelete] = useState([]);

  const [showToast, setShowToast] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState({
    delete: false,
  });

  const TRowsPerPage = 4;
  const handlePageChange = (page) => setCurrentPage(page);
  const totalPages = Math.ceil(lengthOfBasket / TRowsPerPage);

  const dataPaginated = [...cartState].slice(
    (currentPage - 1) * TRowsPerPage,
    currentPage * TRowsPerPage
  );

  //delete
  const handleShowDeleteModal = (productId, productName) => {
    setShowModal((prevShowModal) => ({ ...prevShowModal, delete: true }));
    setSelectedProductForDelete([productId, productName]);
  };

  const handleDelete = () => {
    dispatch(removeProductFromCart(selectedProductForDelete[0]));
    setShowModal((prevShowModal) => ({ ...prevShowModal, delete: false }));
    toast.success("محصول با موفقیت حذف شد", {
      autoClose: 2000,
      theme: "dark",
    });
    setShowToast(true);
    setSelectedProductForDelete(null);

    if (lengthOfBasket === (currentPage - 1) * TRowsPerPage + 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const calcSum = () => {
    const getSum = (total, order) => {
      return total + order.count * order.product.price;
    };

    let result = cartState.reduce(getSum, 0);
    return result.toLocaleString();
  };

  const handleNavigateToCheckout = () => {
    navigate(`${HOME_ROUTE}${CHECKOUT_ROUTE}`);
  };

  const columns = [
    {
      id: 1,
      lable: "نام کالا",
      width: "w-[40%]",
    },
    {
      id: 2,
      lable: "قیمت",
      width: "w-[20%]",
    },
    {
      id: 3,
      lable: "تعداد",
      width: "w-[20%]",
    },
    {
      id: 4,
      lable: "",
      width: "w-[20%]",
    },
  ];

  return (
    <div className="w-4/5 mx-auto container py-3 mt-24 mr-14 flex flex-col gap-y-2 md:px-20">
      <div className="flex items-center justify-between mb-2 ml-4">
        <h1 className="mr-4 text-xl text-orange-500 font-bold">سبد خرید</h1>
      </div>
      <Table columns={columns}>
        {Array.isArray(dataPaginated) &&
          dataPaginated.map((row, index) => (
            <tr
              key={row.product._id}
              className={`bg-neutral-100 dark:border-neutral-500 text-orange-200
              ${index % 2 === 0 ? "dark:bg-neutral-700" : "dark:bg-neutral-600"}
              `}
            >
              <td className="whitespace-nowrap px-6 py-4">
                {row.product.name}
              </td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4">
                {row.product.price.toLocaleString()}
              </td>
              <td className="whitespace-nowrap pr-10 pl-6 py-4">{row.count}</td>
              <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                <OutlineButton
                  bordercolorLight="border-red-600"
                  bordercolorDark="border-red-700"
                  textcolorLight="text-red-600"
                  textcolorDark="text-red-700"
                  onClick={() =>
                    handleShowDeleteModal(row.product._id, row.product.name)
                  }
                >
                  حذف
                </OutlineButton>
              </td>
            </tr>
          ))}
      </Table>
      <div className="flex items-center justify-between w-3/5 mx-auto flex-col md:flex-row">
        <div className="flex items-center font-semibold  text-orange-200 mb-4 md:mb-0">
          جمع : <span className="mr-1"> {calcSum()} تومان </span>
        </div>
        <OutlineButton
          bordercolorDark="border-green-700"
          bordercolorLight="border-green-500"
          textcolorDark="text-green-700"
          textcolorLight="text-green-500"
          onClick={handleNavigateToCheckout}
        >
          نهایی کردن سبد خرید
        </OutlineButton>
      </div>

      {showToast && <ToastContainer />}

      <Pagination
        TRowsPerPage={TRowsPerPage}
        total={lengthOfBasket}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showModal.delete && (
        <DeleteModal
          label="حذف سفارش"
          productName={selectedProductForDelete[1]}
          onDelete={() => handleDelete(selectedProductForDelete[0])}
          onClose={() =>
            setShowModal((prevShowModal) => ({
              ...prevShowModal,
              delete: false,
            }))
          }
        />
      )}
    </div>
  );
};

export default Basket;

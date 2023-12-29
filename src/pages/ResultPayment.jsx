import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { clearCart } from "../features/cart/cartSlice";
import { HOME_ROUTE, ORDERS_URL } from "../config";
import { instance } from "../api";

import fail from "../assets/payment result/fail1.gif";
import success from "../assets/payment result/success1.gif";

const ResultPayment = () => {
  const { resultType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);

  const userId = "656cbd9078e318b55602989f";

  //add mutation ...
  const addOrder = useMutation({
    mutationFn: (order) => instance.post(`${ORDERS_URL}`, order),
    onError: async (error) => {
      console.log("error", error);
    },
    onSuccess: async () => {
      console.log("با موفقیت ثبت شد");
    },
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAdd();
      navigate(HOME_ROUTE);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [addOrder]);

  let products = [];
  products = cartState.map((product) => ({
    count: product.count,
    product: product.product._id,
  }));

  const order = {
    user: userId,
    products: products,
    deliveryStatus: false,
  };

  const handleAdd = () => {
    if (resultType === "success") {
      addOrder.mutate(order);
      dispatch(clearCart());
    }
  };

  return (
    <div className="mt-32 mx-auto w-8/12">
      {resultType === "success" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-green-500 flex-1 text-3xl whitespace-nowrap mb-10">
              🌿 پرداخت موفقیت‌آمیز بود! 🌿
            </h4>
            {/* <p className="text-center w-full text-xl mt-5"> 🤩 🌿 </p> */}
          </div>
          <img src={success} alt="" width={500} className="rounded-2xl" />
        </div>
      ) : resultType === "fail" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-red-500 flex-1 text-3xl whitespace-nowrap mb-10">
              🚫 پرداخت ناموفق بود! 🚫
            </h4>
          </div>
          <img src={fail} alt="" width={500} className="rounded-2xl" />
        </div>
      ) : (
        <>
          <h4>نتیجه پرداخت ناشناخته است!</h4>
        </>
      )}
    </div>
  );
};

export default ResultPayment;

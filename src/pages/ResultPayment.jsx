import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { clearCart } from "../features/cart/cartSlice";
import { HOME_ROUTE, ORDERS_URL, USERS_URL } from "../config";
import { instance } from "../api";

import fail from "../assets/payment result/fail1.gif";
import success from "../assets/payment result/success1.gif";

const ResultPayment = () => {
  const { resultType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const userState = useSelector((state) => state.user);

  //add mutation order ...
  const addOrder = useMutation({
    mutationFn: (order) => instance.post(`${ORDERS_URL}`, order),
    onError: async (error) => {
      console.log("error", error);
    },
    onSuccess: async () => {
      console.log("با موفقیت ثبت شد");
    },
  });

  //add mutation user ...
  const addUser = useMutation({
    mutationFn: (user) => instance.post(`${USERS_URL}`, user),
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: () => {
      console.log("با موفقیت ثبت شد");
    },
  });

  const handleAddUser = () => {
    addUser.mutate(userState.user);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAddUser();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (addUser.isSuccess) {
      const userId = addUser?.data?.data?.data?.user?._id;
      const orderData = {
        user: userId,
        products: products,
        deliveryStatus: false,
      };
      if (resultType === "success") {
        addOrder.mutate(orderData);
        dispatch(clearCart());
      }
    }
    const timeoutId = setTimeout(() => {
      navigate(HOME_ROUTE);
    }, 8000);

    return () => clearTimeout(timeoutId);
  }, [addUser.isSuccess]);

  let products = [];
  products = cartState.map((product) => ({
    count: product.count,
    product: product.product._id,
  }));

  return (
    <div className="mt-32 mx-auto w-8/12">
      {resultType === "success" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-green-500 flex-1 text-3xl whitespace-nowrap mb-10">
              🌿 پرداخت موفقیت‌آمیز بود! 🌿
            </h4>
          </div>
          <img
            src={success}
            alt="success gif"
            width={500}
            className="rounded-2xl"
          />
        </div>
      ) : resultType === "fail" ? (
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flae flex-col flex-1 items-center justify-center">
            <h4 className="text-red-500 flex-1 text-3xl whitespace-nowrap mb-10">
              🚫 پرداخت ناموفق بود! 🚫
            </h4>
          </div>
          <img src={fail} alt="fail-gif" width={500} className="rounded-2xl" />
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

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";

import { BASKET_ROUTE, HOME_ROUTE, PRODUCTS_URL } from "../config";
import { Counter, ImageSlider, OutlineButton } from "../components";
import { RiArrowLeftSFill } from "react-icons/ri";
import { instance } from "../api";
import { addProductToCart } from "../features/cart/cartSlice";
import { Spinner } from "../common";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = id;

  const cartState = useSelector((state) => state.cart);

  let initCount = 1;
  const handleCount = () => {
    cartState.map((item) => {
      if (item.product._id === productId) {
        initCount = item.count;
      }
    });
    return initCount;
  };

  const [counterProduct, setcounterProduct] = useState(handleCount());

  useEffect(() => {
    handleCount();
  }, [initCount]);

  const { isPending, error, data } = useQuery({
    queryKey: ["productById", productId],
    queryFn: () =>
      instance.get(`${PRODUCTS_URL}/${productId}`).then((res) => res.data),
    keepPreviousData: true,
    staleTime: 30000,
  });

  const handleIncremeant = () => {
    if (counterProduct < product.quantity) {
      setcounterProduct((prevCounter) => prevCounter + 1);
    }
  };

  const handleDecrement = () => {
    if (counterProduct > 1) {
      setcounterProduct((prevCounter) => prevCounter - 1);
    }
  };

  if (isPending) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  const { product } = data.data;

  const handleAddtoCart = () => {
    dispatch(addProductToCart({ product, counterProduct }));
    navigate(`${HOME_ROUTE}${BASKET_ROUTE}`);
  };

  return (
    <div className="container mx-auto py-10 mt-32 mr-14 flex flex-col gap-y-14 px-4 md:px-20">
      <div className="flex flex-col items-center gap-x-16 md:flex-row md:mr-20">
        <ImageSlider images={product?.images} />
        <div className="flex flex-col items-start gap-5 mt-8 md:mt-0">
          <div className="text-3xl text-orange-500 ">{product.name}</div>
          <div className="flex items-center text-orange-200">
            <div>{product.category.name}</div>
            <RiArrowLeftSFill className="text-orange-500 text-lg" />
            <div className="mr-4">{product.subcategory.name}</div>
          </div>
          <div className="text-orange-200 font-bold text-xl">
            {counterProduct !== 0
              ? (product.price * counterProduct).toLocaleString()
              : product.price.toLocaleString()}
            <span className="mr-7 font-normal text-base">تومان</span>
          </div>
          <div className="flex items-center mt-10">
            <Counter
              counterProduct={counterProduct}
              onIncremeant={handleIncremeant}
              onDecrement={handleDecrement}
            />
            {product.quantity !== 0 ? (
              <OutlineButton
                className="ml-4"
                bordercolorLight="border-green-600"
                bordercolorDark="border-green-700"
                textcolorLight="text-green-400"
                textcolorDark="text-green-500"
                onClick={handleAddtoCart}
              >
                افزودن به سبد خرید
              </OutlineButton>
            ) : (
              <span className="text-red-500">اتمام موجودی</span>
            )}
          </div>
        </div>
      </div>

      <div className="text-justify text-neutral-300">
        {parse(product.description)}
      </div>
    </div>
  );
};

export default Product;

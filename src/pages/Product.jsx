import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import parse from "html-react-parser";
import { instance } from "../api";
import { PRODUCTS_URL } from "../config";
import { RiArrowLeftSFill } from "react-icons/ri";
import { Counter, ImageSlider, OutlineButton } from "../components";

const Product = () => {
  const { id } = useParams();
  const productId = id.slice(3);

  const [counterProduct, setcounterProduct] = useState(1);

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

  if (isPending) return "loading...";

  if (error) return "An error has occurred: " + error.message;

  const { product } = data.data;
  return (
    <div className="container mx-auto py-10 px-20 mt-32 mr-14 flex flex-col gap-y-14">
      <div className="flex items-center gap-x-16 mr-20">
        <ImageSlider images={product?.images} />
        <div className="flex flex-col items-start gap-5">
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
            {product.quantity !== 0 && (
              <OutlineButton
                className="ml-4"
                bordercolorLight="border-green-600"
                bordercolorDark="border-green-700"
                textcolorLight="text-green-400"
                textcolorDark="text-green-500"
              >
                افزودن به سبد خرید
              </OutlineButton>
            )}
          </div>
        </div>
      </div>

      {/* <div dangerouslySetInnerHTML={{ __html: product.description }}></div> */}
      <div className="text-justify text-neutral-300">
        {parse(product.description)}
      </div>
    </div>
  );
};

export default Product;

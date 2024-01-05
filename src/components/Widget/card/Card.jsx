import RateSvg from "../rating/RateSvg";

export const Card = ({ name, price, rate, img }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900">
      <img
        className="rounded-lg object-cover w-2/4 h-2/4 md:w-2/5 md:h-2/5"
        src={`http://localhost:8000/images/products/images/${img}`}
        alt=""
      />
      <div className="w-full flex flex-col justify-start p-6">
        <h5 className="mb-6 text-xl font-medium text-neutral-800 dark:text-white whitespace-nowrap truncate lg:w-32">
          {name}
        </h5>
        <p className="mb-4 text-base text-end text-neutral-600 dark:text-orange-500">
          {price} تومان
        </p>
        <RateSvg className="self-end" rate={rate} />
      </div>
    </div>
  );
};

import RateSvg from "../rating/RateSvg";

export const Card = ({ name, price, rate, img }) => {
  return (
    <div className="flex items-center justify-between p-6 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900">
      <img
        className="w-32 h-32 rounded-lg object-cover"
        src={`http://localhost:8000/images/products/images/${img}`}
        alt=""
      />
      <div className="flex flex-col w-60 justify-start p-6">
        <h5 className="mb-6 text-xl font-medium text-neutral-800 dark:text-white whitespace-nowrap truncate">
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

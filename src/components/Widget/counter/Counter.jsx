export const Counter = ({ onIncremeant, onDecrement, counterProduct }) => {
  return (
    <div className="flex items-center justify-center border-2 border-orange-500 rounded-full ml-10">
      <span
        className="cursor-pointer select-none	 text-green-500 w-6 flex items-center justify-center text-lg"
        onClick={onIncremeant}
      >
        +
      </span>
      <span className="w-6 select-none text-orange-500 flex items-center justify-center text-lg">
        {counterProduct}
      </span>
      <span
        className="cursor-pointer select-none	 text-red-500 w-6 flex items-center justify-center text-lg"
        onClick={onDecrement}
      >
        -
      </span>
    </div>
  );
};

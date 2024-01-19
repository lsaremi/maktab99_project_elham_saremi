import { IoIosArrowDown } from "react-icons/io";

export const SelectBoxSection = ({
  value,
  onChange,
  name,
  defaultOption,
  array,
  label,
  className,
  onBlur,
  condition,
  error,
}) => {
  return (
    <div className="mb-4 w-full text-right">
      <label className="block text-orange-300 text-sm font-bold mb-2">
        <div className="flex items-center gap-4">
          {label}
          {condition ? (
            <div className="text-xs text-red-500">{error}</div>
          ) : null}
        </div>
      </label>
      <div className="relative">
        <IoIosArrowDown className="absolute text-orange-300 top-3 right-3 cursor-pointer" />

        <select
          value={value}
          className={`${className} shadow bg-transparent appearance-none focus:border-primary  border-neutral-600 rounded w-full py-2 pr-8 pl-3 text-orange-200 leading-tight focus:outline-none focus:shadow-outline outline-none border cursor-pointer`}
          onBlur={onBlur}
          name={name}
          onChange={onChange}
        >
          <option className="bg-[#525252] p-4 cursor-pointer">
            {defaultOption}
          </option>
          {array?.map((item, index) => (
            <option
              className="bg-[#212121] p-4 cursor-pointer"
              key={item.id || index}
              value={item.id}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

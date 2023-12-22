import { TERipple } from "tw-elements-react";

export const OutlineButton = ({
  children,
  className,
  bordercolorLight,
  textcolorLight,
  bordercolorDark,
  textcolorDark,
  onClick,
  type = "button",
}) => {
  return (
    <TERipple className={className}>
      <button
        onClick={onClick}
        type={type}
        className={`inline-block whitespace-nowrap rounded-full border-2 ${bordercolorLight} px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal ${textcolorLight} transition duration-150 ease-in-out hover:${bordercolorLight} hover:bg-neutral-500 hover:bg-opacity-10 hover:${textcolorLight} focus:${bordercolorLight} focus:${textcolorLight} focus:outline-none focus:ring-0 active:${bordercolorDark} active:${textcolorDark} dark:hover:bg-neutral-100 dark:hover:bg-opacity-10`}
      >
        {children}
      </button>
    </TERipple>
  );
};

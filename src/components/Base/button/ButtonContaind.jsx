export const ButtonContaind = ({
  children,
  bgColorLight,
  textColor,
  bgColorAccent100,
  bgColorAccent200,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-block rounded-full font-semibold ${bgColorLight} px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal ${textColor} transition duration-150 ease-in-out hover:${bgColorAccent100} focus:${bgColorAccent100} focus:outline-none focus:ring-0 active:${bgColorAccent200}`}
    >
      {children}
    </button>
  );
};

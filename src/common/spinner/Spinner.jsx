import { WrapperModals } from "../wrapper_modals";

export const Spinner = () => {
  const onClose = () => {};
  return (
    <WrapperModals onClick={onClose}>
      <div className="w-12 h-12 border border-t-4 border-t-orange-500 border-l-4 border-l-orange-500 border-b-4 border-b-orange-500  rounded-full animate-spin mb-28"></div>
    </WrapperModals>
  );
};

import { OutlineButton } from "../../components";
import { WrapperModals } from "../wrapper_modals";

export const DeleteModal = ({
  onDelete,
  onClose,
  selectedProduct,
  productName,
  label,
}) => {
  const handleDelete = (event) => {
    event.preventDefault();
    onDelete(selectedProduct);
    onClose();
  };
  return (
    <WrapperModals>
      <form
        dir="rtl"
        onSubmit={handleDelete}
        className="inline-block p-6 align-bottom bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-12 sm:align-middle sm:max-w-lg sm:w-full md:my-8"
      >
        <div className="flex flex-col pr-4 pl-0 pb-4">
          <div className="sm:flex justify-between items-center">
            <h3 className="text-lg leading-6 font-bold text-green-500 text-right">
              {label}
            </h3>

            <div
              className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <p className="text-lg text-right pr-2 text-orange-200">
            مطمئنی میخوای
            <span className="text-red-500"> {productName} </span>
            رو حذف کنی؟
          </p>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex items-center justify-center gap-5">
          <OutlineButton
            bordercolorDark="border-red-700"
            bordercolorLight="border-red-600"
            textcolorDark="text-red-700"
            textcolorLight="text-red-600"
            onClick={handleDelete}
          >
            حذف
          </OutlineButton>
          <OutlineButton
            bordercolorDark="border-orange-700"
            bordercolorLight="border-orange-600"
            textcolorDark="text-orange-700"
            textcolorLight="text-orange-600"
            onClick={onClose}
          >
            انصراف
          </OutlineButton>
        </div>
      </form>
    </WrapperModals>
  );
};

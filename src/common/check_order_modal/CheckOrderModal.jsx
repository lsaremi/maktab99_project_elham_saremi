import { OutlineButton, Table } from "../../components";
import { WrapperModals } from "../wrapper_modals";

export const CheckOrderModal = ({
  onClose,
  delivered,
  data,
  onEditDeliveryStatus,
}) => {
  const columns = [
    {
      id: 1,
      lable: "نام کالا",
      width: "w-[60%]",
    },
    {
      id: 2,
      lable: "قیمت",
      width: "w-[20%]",
    },
    {
      id: 3,
      lable: "تعداد",
      width: "w-[20%]",
    },
  ];

  return (
    <WrapperModals>
      <form
        dir="rtl"
        className="inline-block w-[30rem] px-10 py-10 align-bottom  bg-neutral-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle"
      >
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg leading-6 font-bold text-right text-green-500">
              نمایش سفارش
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
          <div className="flex flex-col w-10/12 items-center gap-5 text-orange-200 mx-auto">
            <div className="flex items-center">
              <span>نام مشتری : </span>
              <p className="">
                {data?.data?.order?.user?.firstname}{" "}
                {data?.data?.order?.user?.lastname}
              </p>
            </div>
            <div className="flex items-center">
              <span> تلفن : </span>
              <p className="">{data?.data?.order.user.phoneNumber}</p>
            </div>
            <div className="flex items-center">
              <span>زمان سفارش : </span>
              <p className="">
                {new Date(data?.data?.order.user.createdAt).toLocaleDateString(
                  "fa"
                )}
              </p>
            </div>
            <div className="flex items-center">
              <span>آدرس : </span>
              <p className="">{data?.data?.order.user.address}</p>
            </div>
            <Table className="h-max" columns={columns}>
              {Array.isArray(data?.data?.order.products) &&
                data?.data?.order.products.map((row, index) => (
                  <tr
                    key={row._id}
                    className={`bg-neutral-100 dark:border-neutral-500 text-orange-200
              ${index % 2 === 0 ? "dark:bg-neutral-700" : "dark:bg-neutral-600"}

              `}
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {row.product?.name}
                    </td>
                    <td className="whitespace-nowrap pr-10 pl-6 py-4">
                      {row.product?.price.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap pr-10 pl-6 py-4">
                      {row.count}
                    </td>
                  </tr>
                ))}
            </Table>
          </div>
          <div className="flex items-center justify-center mt-5">
            {!delivered ? (
              <OutlineButton
                bordercolorDark="border-green-700"
                bordercolorLight="border-green-600"
                textcolorDark="text-green-700"
                textcolorLight="text-green-600"
                type="submit"
                className="text-lg"
                onClick={onEditDeliveryStatus}
              >
                تحویل شد
              </OutlineButton>
            ) : (
              <span className="text-green-500">
                زمان تحویل :{" "}
                {new Date(data.data.order.deliveryDate).toLocaleDateString(
                  "fa"
                )}
              </span>
            )}
          </div>
        </div>
      </form>
    </WrapperModals>
  );
};

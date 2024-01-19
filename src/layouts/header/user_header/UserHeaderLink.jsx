import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { OutlineButton } from "../../../components";
import {
  BASKET_ROUTE,
  LOGIN_ROUTE,
  PANELORDERS_ROUTE,
  PANELPRODUCTS_ROUTE,
} from "../../../config";

export const UserHeaderLink = () => {
  const lengthOfBasket = useSelector((state) => state.cart.length);

  const isLogin = useSelector((state) => state.auth.isLogin);

  const { resultType } = useParams();

  return (
    <ul className="flex items-center gap-x-2 md:pl-6">
      <li>
        <Link
          to={
            isLogin
              ? `${PANELPRODUCTS_ROUTE}/${PANELORDERS_ROUTE}`
              : LOGIN_ROUTE
          }
        >
          <OutlineButton
            bordercolorDark="border-green-700"
            bordercolorLight="border-green-600"
            textcolorDark="text-green-200"
            textcolorLight="text-green-100"
          >
            مدیریت
          </OutlineButton>
        </Link>
      </li>
      <li>
        {resultType !== "success" && (
          <Link to={BASKET_ROUTE}>
            <OutlineButton
              bordercolorDark="border-green-700"
              bordercolorLight="border-green-600"
              textcolorDark="text-green-200"
              textcolorLight="text-green-100"
            >
              <div className="flex items-center gap-2 relative">
                <BsCart4 className="text-lg" />
                <span className="absolute -right-2 -top-2 rounded-full  bg-red-600 py-[1px] px-[4px] m-0 text-white text-xs leading-tight text-center flex items-center justify-center">
                  <span className="self-center">{lengthOfBasket}</span>
                </span>
                سبد خرید
              </div>
            </OutlineButton>
          </Link>
        )}
      </li>
    </ul>
  );
};

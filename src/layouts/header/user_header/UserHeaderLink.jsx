import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { OutlineButton } from "../../../components";
import { BASKET_ROUTE, LOGIN_ROUTE } from "../../../config";

export const UserHeaderLink = () => {
  return (
    <ul className="flex items-center gap-x-2">
      <li>
        <Link to={LOGIN_ROUTE}>
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
        <Link to={BASKET_ROUTE}>
          <OutlineButton
            bordercolorDark="border-green-700"
            bordercolorLight="border-green-600"
            textcolorDark="text-green-200"
            textcolorLight="text-green-100"
          >
            <div className="flex items-center gap-2">
              <BsCart4 className="text-base" />
              سبد خرید
            </div>
          </OutlineButton>
        </Link>
      </li>
    </ul>
  );
};

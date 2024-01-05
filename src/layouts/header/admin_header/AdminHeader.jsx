import { Link } from "react-router-dom";
import { OutlineButton } from "../../../components";
import { AdminHeaderLink } from "./AdminHeaderLink";
import logo from "../../../assets/images/logo.png";
import { HOME_ROUTE } from "../../../config";

export const AdminHeader = () => {
  return (
    <header className="bg-[#4D4D4D] mb-5">
      <div className="container mx-auto w-full flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center gap-4 relative">
          <Link to={HOME_ROUTE}>
            <img width={80} alt="logo" src={logo} className="cursor-pointer" />
          </Link>
          <h1 className="text-green-500 font-bold text-xl whitespace-nowrap">
            پنل مدیریت فروشگاه
          </h1>
        </div>
        <AdminHeaderLink />
        <ul className="my-3 md:my-0">
          <li>
            <Link to={HOME_ROUTE}>
              <OutlineButton
                bordercolorDark="border-orange-700"
                bordercolorLight="border-orange-500"
                textcolorDark="text-orange-700"
                textcolorLight="text-orange-500"
              >
                بازگشت به سایت
              </OutlineButton>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

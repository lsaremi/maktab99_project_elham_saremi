import { UserHeaderLink } from "./UserHeaderLink";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { HOME_ROUTE } from "../../../config";

export const UserHeader = () => {
  return (
    <header className="bg-[#4D4D4D] fixed w-full z-50">
      <div className="container h-20 flex items-center gap-8 justify-evenly mx-auto md:justify-between md:h-auto ">
        <div className="flex items-center gap-4 md:pr-6">
          <Link to={HOME_ROUTE}>
            <img alt="logo" src={logo} className="cursor-pointer w-20" />
          </Link>
          <h1 className="text-green-500 font-bold text-xl whitespace-nowrap">
            کافی استور
          </h1>
        </div>
        <UserHeaderLink />
      </div>
    </header>
  );
};

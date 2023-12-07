import { UserHeaderLink } from "./UserHeaderLink";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { HOME_ROUTE } from "../../../config";

export const UserHeader = () => {
  return (
    <header className="bg-[#4D4D4D]">
      <div className="container mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <Link to={HOME_ROUTE}>
            <img width={80} alt="logo" src={logo} className="cursor-pointer" />
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

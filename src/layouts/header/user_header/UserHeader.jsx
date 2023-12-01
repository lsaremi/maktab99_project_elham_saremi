import { Outlet } from "react-router-dom";
import { UserHeaderLink } from "./UserHeaderLink";

export const UserHeader = () => {
  return (
    <>
      <header className="flex items-center justify-around">
        <div>کافی استور</div>
        <UserHeaderLink />
      </header>
    </>
  );
};

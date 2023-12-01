import { Outlet } from "react-router-dom";
import { UserHeader } from "../../header";

export const MainApp = () => {
  return (
    <>
      <UserHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

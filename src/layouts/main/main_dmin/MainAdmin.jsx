import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../header";

export const MainAdmin = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

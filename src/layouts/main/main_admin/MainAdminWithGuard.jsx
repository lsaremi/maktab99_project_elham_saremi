import { Outlet } from "react-router-dom";
import { AdminHeader } from "../../header";
import { WithGuard } from "../../../components";

const MainAdmin = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export const MainAdminWithGuard = WithGuard(MainAdmin);

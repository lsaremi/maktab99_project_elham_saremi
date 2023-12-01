import { AdminHeaderLink } from "./AdminHeaderLink";

export const AdminHeader = () => {
  return (
    <>
      <header className="flex items-center justify-around">
        <h1>پنل مدیریت فروشگاه</h1>
        <AdminHeaderLink />
      </header>
    </>
  );
};

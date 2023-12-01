import { Link } from "react-router-dom";

export const AdminHeaderLink = () => {
  return (
    <nav className="flex items-center gap-x-20 justify-between">
      <ul className="flex items-center gap-x-4">
        <li>
          {/* <Link to="panelProducts">کالاها</Link> */}
          <Link to="/admin">کالاها</Link>
        </li>
        <li>
          <Link to="panelQuantity">موجودی و قیمت</Link>
        </li>
        <li>
          <Link to="panelOrders">سفارش ها</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/">بازگشت به سایت</Link>
        </li>
      </ul>
    </nav>
  );
};

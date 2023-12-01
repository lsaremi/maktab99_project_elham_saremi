import { Link } from "react-router-dom";

export const UserHeaderLink = () => {
  return (
    <ul className="flex items-center gap-x-2">
      <li>
        <Link to="login">مدیریت</Link>
      </li>
      <li>
        <Link to="basket">سبد خرید</Link>
      </li>
    </ul>
  );
};

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PANELORDERS_ROUTE,
  PANELPRODUCTS_ROUTE,
  PANELQUANTITY_ROUTE,
} from "../../../config";

export const AdminHeaderLink = () => {
  const [activeTab, setActiveTab] = useState(PANELORDERS_ROUTE);

  const handleTabClick = (route) => {
    setActiveTab((prevRoute) => (prevRoute === route ? prevRoute : route));
  };

  return (
    <nav className="py-2 flex items-center justify-center">
      <ul className="flex items-center gap-x-6">
        <li>
          <Link
            to={PANELPRODUCTS_ROUTE}
            className={`text-green-500 hover:text-green-400 transition duration-300 px-2 pb-1 ${
              activeTab === PANELPRODUCTS_ROUTE && "border-b-2 border-green-500"
            }`}
            onClick={() => handleTabClick(PANELPRODUCTS_ROUTE)}
          >
            کالاها
          </Link>
        </li>
        <li>
          <Link
            to={PANELQUANTITY_ROUTE}
            className={`text-green-500 hover:text-green-400 transition duration-300 px-2 pb-1 ${
              activeTab === PANELQUANTITY_ROUTE && "border-b-2 border-green-500"
            }`}
            onClick={() => handleTabClick(PANELQUANTITY_ROUTE)}
          >
            موجودی و قیمت
          </Link>
        </li>
        <li>
          <Link
            to={PANELORDERS_ROUTE}
            className={`text-green-500 hover:text-green-400 transition duration-300 px-2 pb-1 ${
              activeTab === PANELORDERS_ROUTE && "border-b-2 border-green-500"
            }`}
            onClick={() => handleTabClick(PANELORDERS_ROUTE)}
          >
            سفارش ها
          </Link>
        </li>
      </ul>
    </nav>
  );
};

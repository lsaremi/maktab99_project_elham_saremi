import { createBrowserRouter } from "react-router-dom";

import {
  HOME_ROUTE,
  PRODUCTS_ROUTE,
  PRODUCT_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  LOGIN_ROUTE,
  PANELPRODUCTS_ROUTE,
  PANELQUANTITY_ROUTE,
  PANELORDERS_ROUTE,
  NOPAGE_ROUTE,
  PAYMENT_ROUTE,
} from "../config";

import { MainApp, MainAdmin } from "../layouts";
import { PrivateRoute } from "./PrivateRoute";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Basket from "../pages/Basket";
import CheckOut from "../pages/CheckOut";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import PanelProducts from "../pages/PanelProducts";
import PanelQuantity from "../pages/PanelQuantity";
import PanelOrders from "../pages/PanelOrders";
import NoPage from "../pages/NoPage";

export const router = createBrowserRouter([
  {
    path: HOME_ROUTE,
    element: <MainApp />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: PRODUCTS_ROUTE,
        element: <Products />,
      },
      {
        path: PRODUCT_ROUTE,
        element: <Product />,
      },
      {
        path: BASKET_ROUTE,
        element: <Basket />,
      },
      {
        path: CHECKOUT_ROUTE,
        element: <CheckOut />,
      },
      {
        path: PAYMENT_ROUTE,
        element: <Payment />,
      },
    ],
  },
  {
    path: PANELPRODUCTS_ROUTE,
    element: (
      <PrivateRoute>
        <MainAdmin />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <PanelProducts />,
      },
      {
        path: PANELORDERS_ROUTE,
        element: <PanelOrders />,
      },
      {
        path: PANELQUANTITY_ROUTE,
        element: <PanelQuantity />,
      },
    ],
  },
  {
    path: NOPAGE_ROUTE,
    element: <NoPage />,
  },
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
]);

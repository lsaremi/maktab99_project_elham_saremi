import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { Loadable } from "../components";

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
  RESULTPAYMENT_ROUTE,
} from "../config";

import { MainApp, MainAdminWithGuard } from "../layouts";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Basket from "../pages/Basket";
import CheckOut from "../pages/CheckOut";
import Payment from "../pages/Payment";
import Login from "../pages/Login";
import NoPage from "../pages/NoPage";
import ResultPayment from "../pages/ResultPayment";
// import Product from "../pages/Product";
const Product = Loadable(lazy(() => import("../pages/Product")));
const PanelProducts = Loadable(lazy(() => import("../pages/PanelProducts")));
const PanelQuantity = Loadable(lazy(() => import("../pages/PanelQuantity")));
const PanelOrders = Loadable(lazy(() => import("../pages/PanelOrders")));

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
      {
        path: RESULTPAYMENT_ROUTE,
        element: <ResultPayment />,
      },
    ],
  },
  {
    path: PANELPRODUCTS_ROUTE,
    element: <MainAdminWithGuard />,
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

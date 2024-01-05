import React from "react";
import { useSelector } from "react-redux";
import Login from "../../../pages/Login";

export const WithGuard = (Component) => {
  const WithGuardWrapper = (props) => {
    const isLogin = useSelector((state) => state.auth.isLogin);
    return isLogin ? (
      <Component {...props} />
    ) : (
      <Login shouldNavigate={false} />
    );
  };

  return WithGuardWrapper;
};

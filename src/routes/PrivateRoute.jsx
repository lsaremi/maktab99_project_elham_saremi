import { Navigate } from "react-router-dom";

export const PrivateRoute = (prop) => {
  const isLogedIn = true;
  return isLogedIn ? <>{prop.children}</> : <Navigate to="/login" />;
};

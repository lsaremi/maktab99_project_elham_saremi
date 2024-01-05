import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import dateReducer from "./date/dateSlice";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  date: dateReducer,
  user: userReducer,
});

export default rootReducer;

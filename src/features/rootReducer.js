import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";
import dateReducer from "./date/dateSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  date: dateReducer,
});

export default rootReducer;

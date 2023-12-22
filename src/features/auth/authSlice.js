import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshTokenThunk } from "./authThunk";

const initialState = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isLogin: false,
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = true;
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.accessToken = action.payload.token.accessToken;
      state.refreshToken = action.payload.token.refreshToken;
      state.isLogin = true;
      state.isLoading = false;
      state.user = action.payload.data.user;
      localStorage.setItem("accessToken", action.payload.token.accessToken);
      localStorage.setItem("refreshToken", action.payload.token.refreshToken);
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.accessToken = action.payload.token.accessToken;
      console.log("state.accessToken", state.accessToken);
      localStorage.setItem("accessToken", action.payload.token.accessToken);
    });
    builder.addCase(refreshTokenThunk.rejected, (state) => {
      state.isLogin = false;
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoading = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, refreshTokenThunk } from "./authThunk";

const initialState = {
  isLogin: false,
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoading = false;
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
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isLogin = false;
      state.user = null;
    });
    builder.addCase(refreshTokenThunk.fulfilled, (state, action) => {
      state.accessToken = action.payload.token.accessToken;
    });
    builder.addCase(refreshTokenThunk.rejected, (state) => {
      state.isLogin = false;
      state.user = null;
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoading = false;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

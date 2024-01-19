import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_URL, REFRESH_TOKEN_URL } from "../../config";
import { instance } from "../../api";

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const response = await instance.post(`${LOGIN_URL}`, data);
  return response.data;
});

export const refreshTokenThunk = createAsyncThunk(
  "auth/token",
  async (data) => {
    const response = await instance.post(`${REFRESH_TOKEN_URL}`, data);

    return response.data;
  }
);

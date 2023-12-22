import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_URL, REFRESH_TOKEN_URL } from "../../config";
import axios from "axios";
import { BASE_URL } from "../../config";

const instance = axios.create({ baseURL: BASE_URL, timeout: 80000 });

export const loginUser = createAsyncThunk("auth/login", async (data) => {
  const response = await instance.post(`${LOGIN_URL}`, data);
  return response.data;
});

export const refreshTokenThunk = createAsyncThunk(
  "auth/token",
  async (data) => {
    // debugger;
    const response = await instance.post(`${REFRESH_TOKEN_URL}`, data);
    console.log("refreshToken1", response);
    console.log("refreshToken2", data);
    console.log("refreshToken3", response.data);
    return response.data;
  }
);

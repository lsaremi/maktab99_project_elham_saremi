import axios from "axios";
import { store } from "../../store";
import { logout, refreshTokenThunk } from "../../features";
import { BASE_URL } from "../../config";

export const instance = axios.create({ baseURL: BASE_URL, timeout: 10000 });
// instance.defaults.baseURL = BASE_URL;
// instance.defaults.timeout = 10000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const state = store.getState();
    const { accessToken, isLogin } = state.auth;
    if (isLogin) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Define the async function for refreshing the token
// const refreshAccessToken = async (refreshToken) => {
//   console.log(refreshToken);
//   debugger;
//   try {
//     console.log("Refreshing token...");
//     const response = await instance.post(REFRESH_TOKEN_URL, { refreshToken });
//     console.log(response.data);
//     return response.data.token.accessToken;
//   } catch (error) {
//     console.error("Error refreshing token:", error.message);
//     throw error; // Propagate the error to handle it in the calling function
//   }
// };

// Add a response interceptor

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const state = store.getState();
    const refreshToken = state.auth.refreshToken;
    console.log("error-response", error);
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const originalRequest = error.config;
      console.log("originalRequest", originalRequest);
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        store
          .dispatch(refreshTokenThunk({ refreshToken }))
          .unwrap()
          .then((data) => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.accessToken}`;
            return instance(originalRequest);
          })
          .catch((error) => {
            console.log(error);
          });

        // const newAccessToken = await refreshAccessToken(refreshToken);
        // originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        console.log(
          "originalRequest.headers",
          originalRequest.headers["Authorization"]
        );
        return instance(originalRequest);
      }
      // else {
      //   console.log("logout");
      //   store.dispatch(logout());
      // }
    }
    return Promise.reject(error);
  }
);

import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      address: "",
      phoneNumber: "",
    },
    // user: "",
  },
  reducers: {
    saveUser: (state, action) => {
      state.user.lastname = action.payload.lastname;
      state.user.firstname = action.payload.firstname;
      state.user.username = action.payload.username;
      state.user.password = action.payload.password;
      state.user.address = action.payload.address;
      state.user.phoneNumber = action.payload.phoneNumber;
    },
    removeUser: (state) => {
      state.lastname = "";
      state.firstname = "";
      state.username = "";
      state.password = "";
      state.address = "";
      state.phoneNumber = "";
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

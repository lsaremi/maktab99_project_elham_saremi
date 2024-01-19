import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: {
    date: null,
  },
  reducers: {
    saveDate: (state, action) => {
      state.date = action.payload?.toString();
      // state.date = action.payload?.getTime();
    },
    removeDate: (state) => {
      state.date = null;
    },
  },
});

export const { saveDate, removeDate } = dateSlice.actions;

export default dateSlice.reducer;

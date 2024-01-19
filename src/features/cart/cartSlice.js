import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProductToCart: (state, action) => {
      const index = state.findIndex(
        (item) => item.product._id === action.payload.product._id
      );

      if (index === -1) {
        state.push({
          product: action.payload.product,
          count: action.payload.counterProduct,
          deliveryDate: action.payload.deliveryDate,
          deliveryStatus: false,
        });
      } else {
        state[index].count = action.payload.counterProduct;
      }
    },
    removeProductFromCart: (state, action) => {
      const index = state.findIndex(
        (item) => item.product._id === action.payload
      );
      state.splice(index, 1);
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProductToCart, clearCart, removeProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

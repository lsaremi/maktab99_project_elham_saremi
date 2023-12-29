import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    // incrementProduct: (state, action) => {
    //   const index = state.findIndex(
    //     (item) => item.product?._id === action.payload.product._id
    //   );
    //   if (index !== -1) {
    //     state[index].count += 1;
    //   } else {
    //     state.push({ count: 1, product: {} });
    //   }
    //   // console.log(state.count);
    // },

    // decrementProduct: (state, action) => {
    //   // const index = state.findIndex(
    //   //   (item) => item.product._id === action.payload.product._id
    //   // );
    //   // const count = state[index].count;
    //   // if (count === 1) {
    //   //   state.splice(index, 1);
    //   // } else {
    //   //   state[index].count -= 1;
    //   // }
    //   if (state.count > 1) {
    //     state.count -= 1;
    //   }
    // },

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

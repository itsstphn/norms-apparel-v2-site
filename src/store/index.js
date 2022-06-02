import { configureStore, createSlice } from "@reduxjs/toolkit";
import productSlice from "./productsSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    cartItems: cartSlice.reducer,
  },
});

export default store;

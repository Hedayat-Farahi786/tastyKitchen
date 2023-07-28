import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./store/productSlice";
import cartReducer from "./store/cart";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./store/productSlice";
import cartReducer from "./store/cart";
import orderReducer from "./store/order";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

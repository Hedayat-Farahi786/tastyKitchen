import { createSlice } from "@reduxjs/toolkit";

import {
  pizzaToppings,
  burgerToppings,
  saladDressings,
} from "../constants/toppingsData";

const initialState = {
  selectedProduct: null,
  selectedOption: null,
  selectedToppings: [],
  extras: [],
  quantity: 1,
  totalPrice: 0,
  isModalOpen: false,
};

const productSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
    resetTopping: (state, action) => {
      state.selectedToppings = action.payload;
    },
    addTopping: (state, action) => {
      const newTopping = action.payload;
      state.selectedToppings.push(newTopping);
    },
    removeTopping: (state, action) => {
      const toppingName = action.payload;
      state.selectedToppings = state.selectedToppings.filter(
        (topping) => topping.name !== toppingName
      );
    },
    setExtras: (state, action) => {
      if (action.payload.menuId === 1) {
        state.extras = saladDressings;
      } else if (action.payload.menuId === 2) {
        state.extras = pizzaToppings;
      } else if (action.payload.menuId === 3) {
        state.extras = burgerToppings;
      } else {
        state.extras = [];
      }
      // state.extras =
      //   action.payload.menuId === 1 ? pizzaToppings : burgerToppings;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  setSelectedProduct,
  setSelectedOption,
  setSelectedToppings,
  setExtras,
  setQuantity,
  setTotalPrice,
  setIsModalOpen,
  addTopping,
  removeTopping,
  resetTopping,
} = productSlice.actions;

export default productSlice.reducer;

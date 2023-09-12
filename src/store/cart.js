import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, extras, price, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product.id === product.id && item.price === price && areExtrasEqual(item.extras, extras)
      );

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart with the same price, update its quantity
        state.cart[existingItemIndex].quantity += quantity;
      } else {
        // If the item does not exist with the same price, add it to the cart with the given quantity
        state.cart.push({
          product,
          extras,
          price,
          quantity,
        });
      }
    },

    removeFromCart: (state, action) => {
      const { productId, extras } = action.payload;
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.product.id === productId && areExtrasEqual(item.extras, extras)
      );

      if (existingItemIndex !== -1) {
        // If the item exists in the cart with the same product id and extras
        if (state.cart[existingItemIndex].quantity > 1) {
          // If the quantity is greater than 1, decrease its quantity
          state.cart[existingItemIndex].quantity -= 1;
        } else {
          // If the quantity is 1, remove the item from the cart
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

function areExtrasEqual(extras1, extras2) {
  if (extras1.length !== extras2.length) {
    return false;
  }

  // Sort the extras arrays to compare them
  const sortedExtras1 = extras1.slice().sort((a, b) => a.name.localeCompare(b.name));
  const sortedExtras2 = extras2.slice().sort((a, b) => a.name.localeCompare(b.name));

  for (let i = 0; i < sortedExtras1.length; i++) {
    if (
      sortedExtras1[i].name !== sortedExtras2[i].name ||
      sortedExtras1[i].price !== sortedExtras2[i].price
    ) {
      return false;
    }
  }

  return true;
}


export const { addToCart, removeFromCart, resetCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;

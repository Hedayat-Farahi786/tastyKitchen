import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    {
      product: {
        id: 2000,
        name: "Chicken Burger",
        description: "Crispy Chicken, Salad, Mayonaise, Totmato and Onion",
        image:
          "https://www.recipetineats.com/wp-content/uploads/2019/08/Avocado-Chicken-Burgers_9.jpg",
        optionsTitle: "Your bun",
        options: [
          { size: "Sesame bun", price: 6.9 },
          { size: "Brioche bun", price: 7.9 },
          { size: "Wholegrain bun", price: 7.9 },
        ],
        menuId: 2,
      },
      price: 6.9,
      quantity: 1,
    },
    {
      product: {
        id: 1000,
        name: "Salami Pizza",
        description: "Tomato sauce, Cheese, and Salami",
        image:
          "https://www.bofrost.de/medias/01781-DE-pizza-con-salame-pic1.jpg-W1400xH1400R1.1?context=bWFzdGVyfHByb2R1Y3QtaW1hZ2VzfDExMzAyOTd8aW1hZ2UvanBlZ3xoODQvaDU4Lzk0MDcyMjE4MjU1NjYvMDE3ODFfREVfcGl6emEtY29uLXNhbGFtZV9waWMxLmpwZ19XMTQwMHhIMTQwMFIxLjF8YjRjY2FkZmZhZjRlMzU5NmUyYzU0ZjEzOTcxZmExM2ZhMDI2Yjk5YjMxZTkwOGMzZDQ4Y2QxODJhOTRiOGU0Nw",
        optionsTitle: "Select as size",
        options: [
          { size: "Single, Ø 26cm", price: 7.9 },
          { size: "Jumbo, Ø 32cm", price: 10.9 },
          { size: "Family, Ø 46cm x 33cm", price: 17.9 },
          { size: "Party, Ø 60cm x 40cm", price: 19.9 },
        ],
        menuId: 1,
      },
      price: 7.9,
      quantity: 2,
    },
  ],
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const { product, price, quantity } = action.payload;
        const existingItem = state.cart.find((item) => item.product.id === product.id);
  
        if (existingItem) {
          // If the item already exists in the cart, update its quantity
          existingItem.quantity += quantity;
        } else {
          // If the item does not exist, add it to the cart with the given quantity
          state.cart.push({
            product,
            price,
            quantity,
          });
        }
      },
      removeFromCart: (state, action) => {
        const { productId } = action.payload;
        const existingItem = state.cart.find((item) => item.product.id === productId);
  
        if (existingItem) {
          // If the item exists in the cart, decrease its quantity
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
          } else {
            // If the quantity is 1, remove the item from the cart
            state.cart = state.cart.filter((item) => item.product.id !== productId);
          }
        }
      },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { addToCart, removeFromCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;

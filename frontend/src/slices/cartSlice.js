import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };

const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map(x => x._id === existItem._id ? item : x);
      } else {
        state.cartItems.push(item);
      }
    },
    calculatePrices: (state) => {
      // Calculate items price
      state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

      // Calculate shipping price (example logic: free shipping over $100, else $10)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price (example tax rate: 15%)
      state.taxPrice = +(state.itemsPrice * 0.15).toFixed(2);

      // Calculate total price
      state.totalPrice = +(state.itemsPrice + state.shippingPrice + state.taxPrice).toFixed(2);
localStorage.setItem('cart', JSON.stringify(state))

    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(x => x._id !== itemId);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addToCart, calculatePrices, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { orderItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

const updateLocalStorage = (state) => {
  localStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      item.qty = Number(item.qty);
      const existItem = state.orderItems.find((x) => x._id === item._id);

      if (existItem) {
        state.orderItems = state.orderItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: item.qty } : x
        );
      } else {
        state.orderItems.push({ ...item, qty: item.qty });
      }

      updateLocalStorage(state);
      updateCart(state); // Ensure this function is correctly updating any necessary values
      return state; // Ensure you return the updated state
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.orderItems = state.orderItems.filter((x) => x._id !== id);
      updateLocalStorage(state);
      updateCart(state);
      return state;
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateLocalStorage(state);
      updateCart(state);
      return state;
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateLocalStorage(state);
      updateCart(state);
      return state;
    },

    clearCart: (state) => {
      state.orderItems = [];
      localStorage.setItem('cart', JSON.stringify(state))
    },

    resetCart: (state) => (state = initialState)
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

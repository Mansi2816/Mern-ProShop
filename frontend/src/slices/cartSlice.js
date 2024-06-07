import { createSlice } from '@reduxjs/toolkit';
import  {updateCart}  from '../utils/cartUtils';


const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], itemsPrice: 0, shippingPrice: 0, taxPrice: 0, totalPrice: 0 };


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(x => x._id === item._id);
  
      if (existItem) {
        state.cartItems = state.cartItems.map(x => 
          x._id === existItem._id ? { ...x, qty: x.qty + item.qty } : x
        );
      } else {
        state.cartItems.push({ ...item, qty: item.qty });
      }
      return updateCart(state);
    },
  

    
    removeFromCart: (state, action) => {
      
      state.cartItems = state.cartItems.filter(x => x._id !== action.payload);
    
      return updateCart(state)
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    }
}},
);

export const { addToCart, calculatePrices, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

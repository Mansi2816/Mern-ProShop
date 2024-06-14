import { createSlice } from '@reduxjs/toolkit';
import  {updateCart}  from '../utils/cartUtils';

const initialState =  localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };

  const updateLocalStorage = (state) => {
    localStorage.setItem('cart', JSON.stringify(state));
  };


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
       // Ensure the quantity is a number
       
       item.qty = Number(item.qty);
      const existItem = state.cartItems.find(x => x._id === item._id);
  
      if (existItem) {
        state.cartItems = state.cartItems.map(x => 
          x._id === existItem._id ? { ...x, qty: item.qty } : x
        );
      } else {
        state.cartItems.push({ ...item, qty: item.qty });
      }
      
      localStorage.setItem('cart',JSON.stringify(state))
      return updateCart(state);
      
    },
  
    removeFromCart: (state, action) => {
    const  id = action.payload
      state.cartItems = state.cartItems.filter(x => x._id !== id);
      updateLocalStorage(state)
      return updateCart(state)
     
    },

   
saveShippingAddress: (state, action) => {
  state.shippingAddress = action.payload;
  return updateCart(state)
},
savePaymentMethod: (state, action) => {
  state.paymentMethod = action.payload;
},

    // clearCart: (state) => {
    //   state.cartItems = [];
    //   state.itemsPrice = 0;
    //   state.shippingPrice = 0;
    //   state.taxPrice = 0;
    //   state.totalPrice = 0;
    //   return updateCart(state)
    // }
}},
);

export const { addToCart, calculatePrices, removeFromCart, clearCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';
import { useNavigate } from 'react-router-dom';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout : (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // localStorage.removeItem('cart'); // Optional: Remove cart from local storage
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Thunk to handle logout and clear cart
export const handleLogout = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearCart());
 
};

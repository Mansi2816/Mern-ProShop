import { createSlice } from '@reduxjs/toolkit';
import { clearCart } from './cartSlice';

// let localStore =  localStorage.getItem('userInfo')
// let initialState;
// if(localStore === undefined || null){
//   console.log("checkkk")
// }else{
// localStore =  { userInfo: localStorage.getItem('userInfo')
// ? JSON.parse(localStorage.getItem('userInfo'))
// : null}
// }

const initialState = {  
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
};

console.log(initialState)

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
      localStorage.clear()
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

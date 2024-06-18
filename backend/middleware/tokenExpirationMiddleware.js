// // tokenExpirationMiddleware.js
// export const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
//     const state = store.getState();
//     const userInfo = state.auth.userInfo;
  
//     if (userInfo) {
//       const token = userInfo.token;
//       const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
//       const currentTime = Date.now() / 1000;
  
//       if (decodedToken.exp < currentTime) {
//         store.dispatch(logout());
//         return store.dispatch({ type: 'auth/tokenExpired' });
//       }
//     }
  
//     return next(action);
//   };
  
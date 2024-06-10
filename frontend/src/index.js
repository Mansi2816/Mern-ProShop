import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import {createBrowserRouter,  createRoutesFromElements,
  Route, RouterProvider
} from 'react-router-dom'
import'./assets/styles/bootstrap.custom.css'
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from './store';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} >
      <Route index={true} path="/" element={<HomeScreen/>}/>
      <Route path="/product/:_id" element={<ProductScreen/>}/>
      <Route path="/cart" element={<CartScreen/>}/>
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path='/Register' element={<RegisterScreen/>}/>
      <Route path='/shipping' element={<ShippingScreen/>}/>
      </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/> 
    </Provider>
    </React.StrictMode>
);


reportWebVitals();

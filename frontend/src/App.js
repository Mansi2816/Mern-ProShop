import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceOrder';
import OrderScreen from './screens/OrderScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UsersListScreen from './screens/admin/UsersListScreen';
import UsersEditScreen from './screens/admin/UserEditScreen'
import PaymentSuccessScreen from './screens/paymentSuccessScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search/:keyword" element={<HomeScreen />} />
            <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path='/top' element={<HomeScreen />} />
            <Route path="/search/:keyword/page/:pageNumber" element={<HomeScreen />} />
            <Route path="/product/:_id" element={<ProductScreen />} />            
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/shipping" element={<ShippingScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/payment" element={<PaymentScreen />} />
              <Route path="/placeorder" element={<PlaceorderScreen />} />
              <Route path="/orders/:id" element={<OrderScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/:id/payment-success' element={<PaymentSuccessScreen />} />

            </Route>

               {/* Admin Routes */}
               <Route element={<AdminRoute />}>
              <Route path="/admin/orderList" element={<OrderListScreen />} />
              <Route path='/admin/productList' element={<ProductListScreen />} />
              <Route path='/admin/productList/:pageNumber' element={<ProductListScreen />} />
              <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
            <Route path='/admin/userlist' element={<UsersListScreen/>}/>
            <Route path='/admin/user/:id/edit' element={<UsersEditScreen/>}/>
            </Route>

          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </Router>
  );
};

export default App;

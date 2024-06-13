import React from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripePaymentForm from './components/StripePaymentForm';
import HomeScreen from './screens/HomeScreen'; // Assuming you have a HomeScreen component
// import OtherScreen from './screens/OtherScreen'; // Assuming you have other screens

const stripePromise = loadStripe('pk_test_51PR5uVLY9I4vwK9ceDbFRzr097STZjLtCnMOgrsSnUgSqnYBvKdNdYFEhU6s5glxtAA2YJJyFHisO0HBLqWMnDB200SmT6Rvzk');

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="/other" element={<OtherScreen />} /> */}
            <Route path="/payment" element={
              <Elements stripe={stripePromise}>
                <StripePaymentForm />
              </Elements>
            } />
          </Routes>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;

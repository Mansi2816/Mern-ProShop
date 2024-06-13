import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const StripePaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // Call your backend to create the PaymentIntent
      const { data: { clientSecret } } = await axios.post('http://localhost:5000/api/create-payment-intent', {
        amount: 1000, // Amount in cents
      });

      // Use Stripe.js to confirm the card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'Jenny Rosen', // You can get the user's name from your form
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      setSuccess('Payment successful!');
      toast.success('Payment successful!');
    } catch (backendError) {
      setError(backendError.response ? backendError.response.data.error : backendError.message);
      toast.error(backendError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <CardElement options={{ hidePostalCode: true }} />
      </Form.Group>
      <Button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </Button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </Form>
  );
};

export default StripePaymentForm;

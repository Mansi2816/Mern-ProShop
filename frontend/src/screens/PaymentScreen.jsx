import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const navigate = useNavigate()
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [shippingAddress,navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    console.log('Form Submitted')
    navigate('/placeorder')
  }


  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='paymentMethod'>
          <Form.Label>Payment Method</Form.Label>
          <Form.Control
            as='select'
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <option value='PayPal'>PayPal</option>
            <option value='Stripe'>Stripe</option>
          </Form.Control>
        
        </Form.Group>
        <Button type='submit' className='btn-block mt-3'  >
          Continue
        </Button>
       
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen

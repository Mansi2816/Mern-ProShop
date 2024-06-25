import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { usePayOrderMutation } from '../slices/orderApiSlice'

const PaymentSuccessScreen = () => {
  const navigate = useNavigate()
  const [payOrder] = usePayOrderMutation()

  useEffect(() => {
    const orderId = localStorage.getItem('orderId') // Store orderId in localStorage before redirect
    if (orderId) {
      payOrder({ orderId, details: { status: 'COMPLETED' } }).unwrap().then(() => {
        toast.success('Payment Successful')
        localStorage.removeItem('orderId')
      }).catch(err => {
        toast.error(err?.data?.message || err.message)
      })
    }

    // Redirect to profile page after a short delay
    const timer = setTimeout(() => {
      navigate('/profile')
    }, 3000) // Adjust the delay as needed

    return () => clearTimeout(timer)
  }, [payOrder, navigate])

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Redirecting to your profile...</p>
    </div>
  )
}

export default PaymentSuccessScreen

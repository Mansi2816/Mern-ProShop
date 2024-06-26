const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  deleteOrder,
  paymentSuccess
} = require('../controllers/orderController')

const { protect, admin } = require('../middleware/authMiddleware')


router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getMyOrders )
router.get('/:id',protect, getOrderById  )
router.put('/:id/pay',protect, updateOrderToPaid )
router.put('/:id/delivered',protect, admin, updateOrderToDelivered)
router.get('/', protect, admin, getOrders )
router.delete('/:id', protect, admin, deleteOrder)
router.put('/:id/payment-success', protect, paymentSuccess)

module.exports = router

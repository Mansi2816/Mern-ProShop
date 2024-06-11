const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  GetOrders
} = require('../controllers/orderController')

const { protect, admin } = require('../middleware/authMiddleware')


router.post('/orders', addOrderItems)
router.get('/orders/myorders', protect, getMyOrders )
router.get('/orders/:id',protect, admin, getOrderById  )
router.put('/orders/:id/pay',protect, updateOrderToPaid )
router.put('/orders/:id/delivered',protect, admin, updateOrderToDelivered)
router.get('/orders', protect, admin, GetOrders )


module.exports = router


const asyncHandler = require('../middleware/async-Handler')
const Order = require('../models/orderModel')


//@desc Create new order
//@route POST/api/orders
//@access Private

const addOrderItems = asyncHandler(async (req, res) => {
  
    res.json("add order items")
})

//@desc Get logged in user orders
//@route GET/api/orders/myorders
//@access Private

const getMyOrders = asyncHandler(async (req, res) => {
    
    res.json("get My Orders")
})

//@desc Get order by id
//@route GET/api/orders/:id
//@access Private

const getOrderById = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json("get order by id")
})

//@desc update order to paid
//@route PUT/api/orders/:id/pay
//@access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json("update order to paid")
})

//@desc update order to delivered
//@route PUT/api/orders/:id/delivered
//@access Private/admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json("update order to delivered")
})

//@desc Get all orders
//@route GET/api/orders
//@access Private/admin

const GetOrders = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json("get all orders")
})

module.exports = { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, GetOrders }

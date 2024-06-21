
const asyncHandler = require('../middleware/async-Handler')
const Order = require('../models/orderModel')
const mongoose = require('mongoose');

//@desc Create new order
//@route POST/api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log('Request body:', req.body); // Log the entire request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    console.log('User ID:', req.user._id); // Log user ID


     // Ensure each orderItem has the 'product' field
     const populatedOrderItems = orderItems.map(item => ({
      ...item,
      product: item.product // Make sure 'product' is correctly populated with the product ID
    }));

       // Log each item to ensure all fields are present
       orderItems.forEach(item => {
        console.log('Order Item:', item);
      });
  
    const order = new Order({
      orderItems: populatedOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

  
  // @desc Get logged in user orders
  // @route GET /api/orders/myorders
  // @access Private
  const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
  })
  
  // @desc Get order by id
  // @route GET /api/orders/:id
  // @access Private
  const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('Order ID:', id);
  
    // Validate the order ID format
    if (!mongoose.isValidObjectId(id)) {
      res.status(400);
      throw new Error('Invalid order ID format');
    }
  
    try {
      const order = await Order.findById(id).populate('user', 'name email');
  
      if (order) {
        res.json(order);
      } else {
        res.status(404);
        throw new Error('Order not found');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500);
      throw new Error('Server error');
    }
  });
  
  
  // @desc Update order to paid
  // @route PUT /api/orders/:id/pay
  // @access Private
  const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      }
  
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc Update order to delivered
  // @route PUT /api/orders/:id/deliver
  // @access Private/Admin
  const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
  
    if (order) {
      order.isDelivered = true
      order.deliveredAt = Date.now()
  
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
  
  // @desc Get all orders
  // @route GET /api/orders
  // @access Private/Admin
  const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).json(orders)
  })

  // @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
  const deleteOrder = asyncHandler (async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
      await order.deleteOne()
      res.json({ message: 'Order removed' })
    } else {
      res.status(404)
      throw new Error('Order not found')
    }
  })
module.exports = { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered,getOrders, deleteOrder}

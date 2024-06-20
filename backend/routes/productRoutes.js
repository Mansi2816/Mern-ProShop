const express = require('express');
const router = express.Router()
const {getProducts,createProductReview, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/ProductController')
const {protect, admin} = require('../middleware/authMiddleware')


router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)
router.route('/:id/reviews').post(protect,createProductReview)

module.exports = router
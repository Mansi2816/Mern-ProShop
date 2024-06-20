const express = require('express');
const router = express.Router()
const {getProducts,createProductReview, getProductById, createProduct, updateProduct, deleteProduct} = require('../controllers/ProductController')
const {protect, admin} = require('../middleware/authMiddleware')
const {checkObjectId} = require ('../middleware/checkObjectId')

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(checkObjectId,getProductById).put(protect,admin,updateProduct,checkObjectId).delete(checkObjectId,protect,admin,deleteProduct)
router.route('/:id/reviews').post(protect,checkObjectId,createProductReview)

module.exports = router
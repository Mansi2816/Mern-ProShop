const asyncHandler = require('../middleware/async-Handler')
const Product = require('../models/productModel')


//@desc Fetch all products
//@route GET/api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//@desc Fetch products by Id
//@route GET/api/products/:id
//@access Private

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    }
    res.status(404).json({ message: 'Resource not found' })
})

module.exports = { getProducts, getProductById }
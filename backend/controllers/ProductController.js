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



//@desc create products
//@route POST/api/products
//@access private admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })
    const createdProduct = await product.save()
    res.status(201).json (createdProduct)
})

module.exports = { getProducts, getProductById, createProduct }
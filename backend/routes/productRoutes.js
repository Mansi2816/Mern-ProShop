const express = require('express');
const router = express.Router()
// const products = require ('../data/products')
const asyncHandler = require('../middleware/async-Handler')
 const Product = require('../models/productModel')  


router.get('/', asyncHandler (async(req,res) => {
    
    const products = await Product.find({})    
    
    res.json(products)
    }))
    
    router.get('/:id', asyncHandler (async (req,res) => {
     const product = await Product.findById(req.params.id)
      
     if(product) {
       return res.json(product)
     }
     res.status(404).json({message: 'Resource not found'})

    }))


module.exports = router
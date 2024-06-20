const { truncateSync } = require('fs')
const mongoose = require('mongoose')
const { type } = require('os')

const reviewSchema = new mongoose.Schema({ 
    //to know which user has created this 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    comment:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const productSchema = new mongoose.Schema({
   //to know which user has created this 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        default:0,
    },
    reviews: [reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },                                                                                                                                                                                                              
    numReviews:{
        type:Number,
        required:true,
        default:0,
    }                                                                                                                                                                                                                 
},{
    timestamps:true,
})

const Product = mongoose.model("Product",productSchema)

module.exports = Product
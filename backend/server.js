const express = require ('express')
const dotenv = require ('dotenv')
dotenv.config()
const port = process.env.PORT || 3000
const connectDB = require('./config/db')
const productRoutes = require ('./routes/productRoutes')

connectDB() //connect to MongoDB
const app = express ()

app.get('/', (req,res) => {
    res.send('api is running')
    })
    
app.use('/api/products' , productRoutes)

app.listen(port,() => console.log(`Server running on port ${port}`))
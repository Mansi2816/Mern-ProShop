const express = require ('express')
const dotenv = require ('dotenv')
dotenv.config()
const port = process.env.PORT || 3000
const {notFound, errorHandler} = require ('./middleware/ErrorMiddleware')
const connectDB = require('./config/db')
const productRoutes = require ('./routes/productRoutes')

connectDB() //connect to MongoDB
const app = express ()

app.get('/', (req,res) => {
    res.send('api is running')
    })
    
app.use('/api/products' , productRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port,() => console.log(`Server running on port ${port}`))
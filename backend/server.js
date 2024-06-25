const path = require('path');
const express = require ('express')
const dotenv = require ('dotenv')
// const Stripe = require('stripe');
dotenv.config()
const port = process.env.PORT || 3000
const {notFound, errorHandler} = require ('./middleware/ErrorMiddleware')
const connectDB = require('./config/db')
const productRoutes = require ('./routes/productRoutes')
const userRoutes = require ('./routes/userRoutes')
const orderRoutes = require ('./routes/orderRoutes')
const uploadRoutes = require ('./routes/uploadRoutes')
const cookieParser = require('cookie-parser')


// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

connectDB() //connect to MongoDB
const app = express ()

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//cookie-parser middleware
app.use(cookieParser())


app.get('/', (req,res) => {
    res.send('api is running')
    })

    app.get('/api/config/paypal', (req,res) => {
    res.send({clientId : process.env.PAYPAL_CLIENT_ID})
    })
    
app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)
app.use('/api/orders' , orderRoutes)
app.use('/api/upload' , uploadRoutes)
// PaymentIntent endpoint
// app.post('/api/create-payment-intent', async (req, res) => {
//     const { amount } = req.body;

//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount: amount,
//             currency: 'usd', // Use your desired currency
//         });

//         res.send({ clientSecret: paymentIntent.client_secret });
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });

// const __dirname = path.resolve() // set dirname to current directory


if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
  } else {
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }
  

app.use('/uploads' , express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)

app.listen(port,() => console.log(`Server running on port ${port}`))
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db');

dotenv.config();

(async () => {
    await connectDB();  // Ensure connectDB() is awaited if it is asynchronous

    const importData = async () => {
        try {
            await Order.deleteMany();
            await Product.deleteMany();
            await User.deleteMany();

            const createdUsers = await User.insertMany(users);

            const adminUser = createdUsers[0]._id;

            const sampleProducts = products.map(product => {
                return { ...product, user: adminUser };
            });
            await Product.insertMany(sampleProducts);

            console.log('Data imported!'.green.inverse);
        } catch (error) {
            console.error(`${error.message}`.red.inverse);
        } finally {
            process.exit();
        }
    };

    const destroyData = async () => {
        try {
            await Order.deleteMany();
            await Product.deleteMany();
            await User.deleteMany();

            console.log('Data destroyed!'.red.inverse);
        } catch (error) {
            console.error(`${error.message}`.red.inverse);
        } finally {
            process.exit();
        }
    };

    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
})();

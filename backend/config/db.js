const mongoose = require('mongoose');
require(dotenv)
const connectDB = async () => {
    try {
        // Connect to MongoDB with proper options
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

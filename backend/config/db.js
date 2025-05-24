const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/nodejs_books");
        console.log("MongoDB connected");
    } catch (err) {
        console.log('Failed to connect to MongoDB: ', err.message);
        process.exit(1)
        
    }
};

module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/day12tasks');
        console.log("MONGODB CONNECTED");
    } catch (err) {
        console.log('Mongodb Error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

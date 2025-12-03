//task2
const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/day12tasks');
        console.log("MongoDB Connected Successfully");
    }
    catch(error){
        console.log("DB error",error.message);
    }
}
module.exports = connectDB;
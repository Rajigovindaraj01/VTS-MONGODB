const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const task3schema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
});

const task3data = mongoose.model('task3data',task3schema);

module.exports = task3data;


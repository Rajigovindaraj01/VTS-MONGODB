const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log('DB Connected'))
.catch(err=>console.log(err));

const task4schema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
})

const task4data  = mongoose.model('task4data',task4schema);
 module.exports = task4data;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const task6Schema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
});

const task6data = mongoose.model('task6data',task6Schema);

task6data.insertMany([
    { name: "Raji", age: 23, city: "Coimbatore" },
  { name: "Priya", age: 25, city: "Chennai" },
  { name: "Kaviya", age: 22, city: "Madurai" }
])
.then(()=>{
    console.log("Multiple documents inserted")
})
.catch(err=>{
    console.log("error:",err);
})
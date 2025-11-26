const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("DB Connected"))
.catch(err=>console.log(err));

const task7Schema = new mongoose.Schema({
    name:String,
    age:Number,
    city:String
});

const task7data = mongoose.model('task7data',task7Schema);

task7data.insertMany([
    { name: "Raji", age: 23, city: "Coimbatore" },
  { name: "Priya", age: 25, city: "Chennai" },
  { name: "Kaviya", age: 22, city: "Madurai" }
])
.then(()=>{
    console.log("Multiple documents inserted")
    return task7data.find()
    // return task7data.findOne({ name: "Raji" });
    // return task7data.find({ age: { $gte: 22 }, city: "Chennai" })
    // return task7data.findById("6720ab3c4567ef89ab123456")
})
.then(res=>{
    console.log("Documents Found:",res)
})
.catch(err=>{
    console.log("error:",err);
})

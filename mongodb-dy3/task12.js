const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

const task12Schema = new mongoose.Schema({
    name:String,
    age:Number
});

const task12data = mongoose.model('task12data',task12Schema);

task12data.insertMany([
    {name:'Raji',age:24},
    {name:'hari',age:24}
])
.then(() => {
    console.log("Data Inserted");
    return task12data.find();
})
.then((data) => {
    console.log("Found Data:", data);
    return mongoose.connection.close();
})
.then(() => {
    console.log("MongoDB Connection Closed ✔");
})
.catch(err => {
    console.log("Error:", err);
    mongoose.connection.close();
});
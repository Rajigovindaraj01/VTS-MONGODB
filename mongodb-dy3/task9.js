const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

const task9Schema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const task9data = mongoose.model('task9data', task9Schema);

// Insert Many
task9data.insertMany([
    { name: "Raji", age: 23, city: "Coimbatore" },
    { name: "Priya", age: 25, city: "Chennai" },
    { name: "Kaviya", age: 22, city: "Madurai" }
])
.then(() => {
    console.log("Multiple documents inserted");
    return task9data.find(); 
})
.then(res => {
    console.log("Documents Found:", res);
    return task9data.deleteOne({ name: "Priya" });
})
.then(deleteRes => {
    console.log("Delete Result:", deleteRes);
    return task9data.find();
})
.then(finalData => {
    console.log("After Delete:", finalData);
})
.catch(err => {
    console.log("Error:", err);
});

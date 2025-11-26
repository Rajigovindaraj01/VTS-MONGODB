const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3')
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

const task8Schema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const task8data = mongoose.model('task8data', task8Schema);

task8data.insertMany([
    { name: "Raji", age: 23, city: "Coimbatore" },
    { name: "Priya", age: 25, city: "Chennai" },
    { name: "Kaviya", age: 22, city: "Madurai" }
])
.then(() => {
    console.log("Multiple documents inserted");
    return task8data.find();
})
// .then(res => {
//     console.log("Documents Found:", res);
//     return task7data.updateOne(
//         { name: "Raji" },               
//         { $set: { city: "Bangalore" } }
//     );
// })
// .then(updateRes => {
//     console.log("Update Result:", updateRes);
//     return task7data.find({ name: "Raji" });
// })
// .then(updatedDoc => {
//     console.log("Updated Document:", updatedDoc);
// })
.catch(err => {
    console.log("Error:", err);
});

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model("task8User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25, city: "Chennai" },
    { name: "Bob", age: 30, city: "Bangalore" },
    { name: "Charlie", age: 22, city: "Chennai" },
    { name: "David", age: 28, city: "Bangalore" },
    { name: "Eve", age: 35, city: "Chennai" }
  ]);

  // Aggregation pipeline
  const result = await User.aggregate([
    { $match: { age: { $gt: 24 } } },      // filter age > 24
    { $group: { _id: "$city", count: { $sum: 1 } } } // count per city
  ]);

  console.log("City-wise count of users age > 24:", result);

  mongoose.connection.close();
}

run();

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model("task10User", userSchema);

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
    { $match: { age: { $gt: 24 } } },           // filter age > 24
    { $group: {                                 // group by city
        _id: "$city",
        count: { $sum: 1 },
        avgAge: { $avg: "$age" }
    }},
    { $sort: { count: -1 } },                  // sort by count descending
    { $project: { city: "$_id", count: 1, avgAge: 1, _id: 0 } }, // rename _id to city
    { $limit: 2 }                               // top 2 cities
  ]);

  console.log("Aggregated result:", result);

  mongoose.connection.close();
}

run();

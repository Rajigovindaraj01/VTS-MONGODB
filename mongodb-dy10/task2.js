const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  city: String
});

const User = mongoose.model("task2User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", city: "Chennai" },
    { name: "Bob", city: "Bangalore" },
    { name: "Charlie", city: "Chennai" },
    { name: "David", city: "Bangalore" },
    { name: "Eve", city: "Chennai" }
  ]);

  // Aggregation with $group
  const result = await User.aggregate([
    {
      $group: {
        _id: "$city",      // group by city
        count: { $sum: 1 } // count number of users in each city
      }
    }
  ]);

  console.log("Number of users per city:", result);

  mongoose.connection.close();
}

run();

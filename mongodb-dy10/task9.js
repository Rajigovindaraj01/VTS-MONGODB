const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task9User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 },
    { name: "David", age: 28 },
    { name: "Eve", age: 35 }
  ]);

  // Aggregation to calculate avg, sum, min, max of age
  const stats = await User.aggregate([
    {
      $group: {
        _id: null,          // group all documents together
        averageAge: { $avg: "$age" },
        totalAge: { $sum: "$age" },
        minAge: { $min: "$age" },
        maxAge: { $max: "$age" }
      }
    }
  ]);

  console.log("Age statistics:", stats);

  mongoose.connection.close();
}

run();

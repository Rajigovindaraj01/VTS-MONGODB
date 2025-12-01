const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task4User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
  ]);

  // Aggregation with $sort (ascending by age)
  const ascending = await User.aggregate([
    { $sort: { age: 1 } } // 1 = ascending
  ]);
  console.log("Users sorted by age (ascending):", ascending);

  // Aggregation with $sort (descending by age)
  const descending = await User.aggregate([
    { $sort: { age: -1 } } // -1 = descending
  ]);
  console.log("Users sorted by age (descending):", descending);

  mongoose.connection.close();
}

run();

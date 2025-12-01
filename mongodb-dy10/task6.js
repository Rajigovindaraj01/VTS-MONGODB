const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task6User", userSchema);

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

  // Aggregation: sort by age descending, skip first 2, limit next 2
  const paginatedUsers = await User.aggregate([
    { $sort: { age: -1 } },  // sort descending by age
    { $skip: 2 },            // skip first 2 documents
    { $limit: 2 }            // take next 2 documents
  ]);

  console.log("Paginated users (skip 2, limit 2):", paginatedUsers);

  mongoose.connection.close();
}

run();

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task5User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 },
    { name: "David", age: 28 }
  ]);

  // Aggregation: sort by age descending, limit top 2
  const top2Users = await User.aggregate([
    { $sort: { age: -1 } },  // sort descending by age
    { $limit: 2 }            // limit to 2 results
  ]);

  console.log("Top 2 oldest users:", top2Users);

  mongoose.connection.close();
}

run();

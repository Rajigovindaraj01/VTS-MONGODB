const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task1User", userSchema);

async function run() {
  // Insert sample data (if not already present)
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 22 }
  ]);

  // Aggregation with $match
  const result = await User.aggregate([
    { $match: { age: { $gt: 24 } } } // filter users with age > 24
  ]);

  console.log("Users with age > 24:", result);

  mongoose.connection.close();
}

run();

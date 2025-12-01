const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  city: String
});

const User = mongoose.model("task3User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", age: 25, city: "Chennai" },
    { name: "Bob", age: 30, city: "Bangalore" },
    { name: "Charlie", age: 22, city: "Chennai" }
  ]);

  // Aggregation with $project
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,        // exclude _id
        name: 1,       // include name
        city: 1        // include city
      }
    }
  ]);

  console.log("Users with only name and city:", result);

  mongoose.connection.close();
}

run();

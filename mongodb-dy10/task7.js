const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  hobbies: [String]
});

const User = mongoose.model("task7User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", hobbies: ["reading", "swimming"] },
    { name: "Bob", hobbies: ["cycling"] },
    { name: "Charlie", hobbies: ["gaming", "reading", "traveling"] }
  ]);

  // Aggregation: unwind hobbies
  const unwound = await User.aggregate([
    { $unwind: "$hobbies" } // flatten the hobbies array
  ]);

  console.log("Flattened hobbies:", unwound);

  mongoose.connection.close();
}

run();

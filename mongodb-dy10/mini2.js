const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  role: String
});

const User = mongoose.model("mini2User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  await User.insertMany([
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
    { name: "Charlie", role: "admin" },
    { name: "David", role: "user" },
    { name: "Eve", role: "moderator" }
  ]);

  // Aggregation pipeline: group by role and count users
  const roleCounts = await User.aggregate([
    {
      $group: {
        _id: "$role",        // group by role
        count: { $sum: 1 }   // count users in each role
      }
    },
    { $project: { role: "$_id", count: 1, _id: 0 } }, // reshape output
    { $sort: { count: -1 } } // optional: sort by count descending
  ]);

  console.log("Users per role:", roleCounts);

  mongoose.connection.close();
}

run();

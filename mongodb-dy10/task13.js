const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("task13User", userSchema);

async function run() {
  // Insert sample data
  await User.deleteMany({});
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push({ name: `User${i}`, age: 20 + i });
  }
  await User.insertMany(users);

  // Pagination settings
  const page = 2;          // second page
  const pageSize = 3;      // 3 users per page
  const skip = (page - 1) * pageSize;

  // Aggregation pipeline for pagination
  const paginatedUsers = await User.aggregate([
    { $sort: { age: 1 } },   // sort by age ascending
    { $skip: skip },         // skip first (page-1)*pageSize documents
    { $limit: pageSize }     // limit to pageSize documents
  ]);

  console.log(`Page ${page} users:`, paginatedUsers);

  mongoose.connection.close();
}

run();

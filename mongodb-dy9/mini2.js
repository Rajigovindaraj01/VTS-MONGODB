const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ---- 2) User Schema ----
const UserSchema = new Schema({
  name: String,
  email: String
});
const User = model("User", UserSchema);

// ---- 3) Post Schema with reference to User ----
const PostSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "User" } // reference to User
});
const Post = model("mini2Post", PostSchema);

// ---- 4) Insert Sample Data ----
async function insertData() {
  const user1 = await User.create({ name: "Alice", email: "alice@example.com" });
  const user2 = await User.create({ name: "Bob", email: "bob@example.com" });

  await Post.create([
    { title: "Post 1", content: "Content of post 1", author: user1._id },
    { title: "Post 2", content: "Content of post 2", author: user2._id },
    { title: "Post 3", content: "Content of post 3", author: user1._id }
  ]);

  console.log("Inserted users and posts");
}

// ---- 5) Fetch Posts with Author Populated ----
async function fetchPostsWithAuthors() {
  const posts = await Post.find().populate("author"); // populate author field
  console.log("Posts with authors populated:", posts);
}

// ---- 6) Run Example ----
async function run() {
  await insertData();
  await fetchPostsWithAuthors();
  mongoose.connection.close();
}

run();

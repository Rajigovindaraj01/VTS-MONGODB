const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Comment Subdocument ----
const CommentSchema = new Schema({
  commenter: String,
  text: String,
  date: { type: Date, default: Date.now }
});

// ---- 3) BlogPost Schema ----
const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [CommentSchema]
});

const BlogPost = model("task9blogPost", BlogPostSchema);

// ---- 4) Insert Sample Document ----
async function insertSamplePost() {
  const post = await BlogPost.create({
    title: "My Post",
    content: "Content of the post",
    comments: [
      { commenter: "Alice", text: "Great post!" },
      { commenter: "Bob", text: "Thanks!" }
    ]
  });
  return post;
}

// ---- 5) Update a Specific Embedded Comment ----
async function updateComment(postId, commentId, newText) {
  // Using positional $ operator to update specific embedded doc
  await BlogPost.updateOne(
    { _id: postId, "comments._id": commentId },
    { $set: { "comments.$.text": newText } }
  );

  // Fetch updated post
  const updatedPost = await BlogPost.findById(postId);
  console.log("Updated Post:", updatedPost);
}

// ---- 6) Run Example ----
async function run() {
  const post = await insertSamplePost();

  // Update Bob's comment
  const commentToUpdate = post.comments.find(c => c.commenter === "Bob");
  await updateComment(post._id, commentToUpdate._id, "Updated thanks comment!");
  
  mongoose.connection.close();
}

run();

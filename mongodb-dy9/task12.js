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

const BlogPost = model("task12blogPost", BlogPostSchema);

// ---- 4) Insert Sample Data ----
async function insertSampleData() {
  await BlogPost.deleteMany({}); // clean collection

  await BlogPost.create([
    {
      title: "Post 1",
      content: "Content 1",
      comments: [
        { commenter: "Alice", text: "Great post!" },
        { commenter: "Bob", text: "Nice read" }
      ]
    },
    {
      title: "Post 2",
      content: "Content 2",
      comments: [
        { commenter: "Charlie", text: "Very informative" },
        { commenter: "Alice", text: "Thanks for sharing" }
      ]
    }
  ]);
}

// ---- 5) Query Embedded Documents ----
async function queryEmbeddedDocs() {
  // 5.1 Find posts where any comment is by "Alice"
  const postsWithAliceComment = await BlogPost.find({ "comments.commenter": "Alice" });
  console.log("Posts with comment by Alice:", postsWithAliceComment);

  // 5.2 Find posts where any comment text contains "Great"
  const postsWithGreatComment = await BlogPost.find({ "comments.text": /Great/i });
  console.log("Posts with 'Great' in comments:", postsWithGreatComment);

  // 5.3 Project only matching comment(s) using $elemMatch
  const postsWithAliceCommentOnly = await BlogPost.find(
    { "comments.commenter": "Alice" },
    { comments: { $elemMatch: { commenter: "Alice" } }, title: 1 }
  );
  console.log("Posts with only Alice's comment projected:", postsWithAliceCommentOnly);
}

// ---- 6) Run Example ----
async function run() {
  await insertSampleData();
  await queryEmbeddedDocs();
  mongoose.connection.close();
}

run();

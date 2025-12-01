const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Comment Subdocument Schema ----
const CommentSchema = new Schema({
  commenter: String,
  text: String,
  date: { type: Date, default: Date.now }
});

// ---- 3) BlogPost Schema with embedded comments (One-to-Many) ----
const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [CommentSchema]   // One-to-Many embedding
});

const BlogPost = model("task7blogPost", BlogPostSchema);

// ---- 4) Insert Document with Multiple Embedded Comments ----
async function insertBlogPost() {
  try {
    const post = await BlogPost.create({
      title: "My First Post",
      content: "This is the blog post content",
      comments: [
        { commenter: "Alice", text: "Great post!" },
        { commenter: "Bob", text: "Thanks for sharing." },
        { commenter: "Charlie", text: "Very informative." }
      ]
    });

    console.log("Inserted BlogPost with comments:", post);

    // Optional: push new comment later
    await BlogPost.updateOne(
      { _id: post._id },
      { $push: { comments: { commenter: "David", text: "Nice read!" } } }
    );

    const updatedPost = await BlogPost.findById(post._id);
    console.log("Updated BlogPost:", updatedPost);

  } catch (err) {
    console.log(err);
  }
}

insertBlogPost();

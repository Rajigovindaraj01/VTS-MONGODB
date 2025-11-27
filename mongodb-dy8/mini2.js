const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Comment schema
    const commentSchema = new mongoose.Schema({
      text: { type: String, required: true },
      postId: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }
    });
    const Comment = mongoose.model("mini2Comment", commentSchema);

    // BlogPost schema
    const blogPostSchema = new mongoose.Schema({
      title: { type: String, required: true },
      content: { type: String, required: true }
    });

    // Post-remove middleware: log deletion and remove related comments
    blogPostSchema.post('remove', async function(doc) {
      console.log(`BlogPost deleted: ${doc.title}`);
      const result = await Comment.deleteMany({ postId: doc._id });
      console.log(`Deleted ${result.deletedCount} comments related to this post`);
    });

    const BlogPost = mongoose.model("mini2BlogPost", blogPostSchema);

    // Create a blog post
    const post = await BlogPost.create({ title: "My First Post", content: "Hello World!" });

    // Add comments for this post
    await Comment.create([
      { text: "Great post!", postId: post._id },
      { text: "Thanks for sharing", postId: post._id }
    ]);

    console.log("BlogPost and comments created");

    // Delete the blog post (triggers post-remove middleware)
    await post.remove();

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

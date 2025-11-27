const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Post schema
    const postSchema = new mongoose.Schema({
      title: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "postRemoveUser" }
    });

    const Post = mongoose.model("task6Post", postSchema);

    // User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true }
    });

    // Post-remove middleware: clean up related posts
    userSchema.post('remove', async function(doc) {
      const result = await Post.deleteMany({ userId: doc._id });
      console.log(`Deleted ${result.deletedCount} posts for user ${doc.name}`);
    });

    const User = mongoose.model("task6postRemoveUser", userSchema);

    // Create a user
    const user = await User.create({ name: "Raji", email: "raji@test.com" });

    // Create related posts
    await Post.create([
      { title: "Post 1", userId: user._id },
      { title: "Post 2", userId: user._id }
    ]);

    console.log("User and posts created");

    // Remove user (triggers post-remove middleware)
    await user.remove();

    console.log("User removed");

    // Check posts remaining
    const remainingPosts = await Post.find({ userId: user._id });
    console.log("Remaining posts:", remainingPosts.length);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

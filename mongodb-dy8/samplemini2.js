const mongoose = require('mongoose');

//Removed useNewUrlParser + useUnifiedTopology (not supported in latest MongoDB driver)
mongoose.connect('mongodb://localhost:27017/day8-tasks');

// Comment Schema
const commentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  content: String
});
const Comment = mongoose.model('Comment', commentSchema);

// BlogPost Schema
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String
});

// Post-deleteOne hook to delete comments after blog post is deleted
blogPostSchema.post('deleteOne', { document: true, query: false }, async function () {
  console.log(`BlogPost with id ${this._id} removed`);
  await Comment.deleteMany({ postId: this._id });
  console.log('Related comments deleted');
});

const BlogPost = mongoose.model('samplemini2-BlogPost', blogPostSchema);

// MAIN Function
async function run() {
  // Create a blog post
  const post = new BlogPost({ title: 'Test Post', content: 'Sample content' });
  await post.save();

  // Create related comments
  await Comment.create([
    { postId: post._id, content: 'Great post!' },
    { postId: post._id, content: 'Thanks for sharing' }
  ]);

  // Remove blog post (TRIGGERS POST-DELETEONE HOOK NOW)
  await post.deleteOne();

  mongoose.connection.close();
}

run();

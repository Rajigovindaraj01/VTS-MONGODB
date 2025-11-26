// filename: articleExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define Article Schema & Model
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  publishedAt: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', articleSchema);

// 3. Update article content by ID
async function updateArticleContent(id, newContent) {
  try {
    const updated = await Article.findByIdAndUpdate(
      id,
      { $set: { content: newContent } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      console.log("No article found with this ID");
      return;
    }

    console.log("Article updated:", updated);
  } catch (err) {
    console.error("Error updating article:", err.message);
  }
}

// 4. Delete article by ID
async function deleteArticle(id) {
  try {
    const deleted = await Article.findByIdAndDelete(id);

    if (!deleted) {
      console.log("No article found to delete");
      return;
    }

    console.log("Article deleted:", deleted);
  } catch (err) {
    console.error("Error deleting article:", err.message);
  }
}

// 5. Example Usage
(async () => {
  try {
    // Create a sample article
    const article = await Article.create({
      title: "MongoDB Tutorial",
      content: "This is an article about MongoDB.",
      author: "Rajeshwari"
    });

    console.log("Created article:", article);

    // Update article content
    await updateArticleContent(article._id, "Updated MongoDB article content.");

    // Delete the article
    await deleteArticle(article._id);

  } catch (err) {
    console.error("Unexpected error:", err.message);
  } finally {
    // Close the connection properly
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
})();

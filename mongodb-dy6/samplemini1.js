// blog.js
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

// 2. Schema
const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  publishedDate: Date
});

// 3. Model
const Article = mongoose.model('Article', articleSchema);

// 4. Update Article Content
const updateArticleContent = async (id, newContent) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { content: newContent },
      { new: true, runValidators: true }
    );
    console.log('Updated Article:', updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
  }
};

// 5. Delete Article
const deleteArticleById = async (id) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    console.log('Deleted Article:', deletedArticle);
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};

// 6. Example usage
(async () => {
  const articleId = "64a1eab1234567890abcdef1"; // replace with your ID

  await updateArticleContent(articleId, "Updated content for this article.");
  await deleteArticleById(articleId);

  mongoose.connection.close();
})();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongodb-day3', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const blogPostSchema = new mongoose.Schema({
  title: String,
  author: String,
  content: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

BlogPost.insertMany([
  { 
    title: "Intro to Mongoose", 
    author: "Alice", 
    content: "Mongoose is great...",
    tags: ["mongodb", "nodejs", "mongoose"] 
  },
  { 
    title: "Async JS", 
    author: "Bob", 
    content: "Understanding async programming", 
    tags: ["javascript", "async"] 
  }
])
.then(() => {
  return BlogPost.find({ tags: "mongodb" });
})
.then(posts => {
  console.log("Posts with 'mongodb' tag:", posts);
  mongoose.connection.close();
})
.catch(err => console.error(err));

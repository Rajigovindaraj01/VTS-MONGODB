const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongodb-day3")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("Connection Error:", err));

// 2. BlogPost Schema
const mini2Schema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  content: String,
  tags: [String]       // array of strings
});

// 3. Model
const mini2data = mongoose.model("samplemini2", mini2Schema);

// 4. CRUD Operations
async function runBlogTask() {
  try {
    // INSERT multiple blog posts
    const insertRes = await mini2data.insertMany([
      {
        title: "Node.js Basics",
        author: "Raji",
        content: "This post explains Node.js fundamentals.",
        tags: ["node", "javascript", "backend"]
      },
      {
        title: "Mongoose Guide",
        author: "Priya",
        content: "Learn how to use Mongoose with MongoDB.",
        tags: ["mongoose", "mongodb", "backend"]
      },
      {
        title: "Frontend Tips",
        author: "Kaviya",
        content: "Useful tips for frontend developers.",
        tags: ["frontend", "html", "css"]
      }
    ]);

    console.log("Blog Posts Inserted:", insertRes);

    // QUERY → find posts with a specific tag
    const tagToSearch = "backend";

    const queryRes = await mini2data.find({ tags: tagToSearch });
    console.log(`Posts with tag '${tagToSearch}':`, queryRes);

  } catch (err) {
    console.log("Error:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("DB Closed");
  }
}

runBlogTask();

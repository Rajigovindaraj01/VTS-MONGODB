// samplemini1.js
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/library")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("Connection Error:", err));

// 2. Create Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  pages: Number,
  published: Date
});

// 3. Create Model
const Book = mongoose.model("Book", bookSchema);

// 4. Create + Read Example
async function run() {
  try {
    // Create a new book
    const newBook = await Book.create({
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      pages: 180,
      published: new Date("1925-04-10")
    });

    console.log("Book Created:", newBook);

    // Find all books by the same author
    const books = await Book.find({ author: "F. Scott Fitzgerald" });

    console.log("Books by the author:", books);

    // Close DB connection
    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

// Call function
run();

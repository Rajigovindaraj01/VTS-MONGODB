const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Book = require("../models/Book");

// CREATE BOOK (POST)
router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL BOOKS
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// GET BOOK BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Book ID" });

  const book = await Book.findById(id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  res.json(book);
});

// UPDATE BOOK (PATCH)
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Book ID" });

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook)
      return res.status(404).json({ error: "Book not found" });

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "Invalid Book ID" });

  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook)
    return res.status(404).json({ error: "Book not found" });

  res.json({ message: "Book deleted successfully" });
});

module.exports = router;

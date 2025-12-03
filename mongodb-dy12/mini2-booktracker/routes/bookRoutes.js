const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Add a book
router.post('/books', async (req, res) => {
    try {
        const { title, author, publishedYear, genre } = req.body;

        const book = new Book({
            title,
            author,
            publishedYear,
            genre
        });

        await book.save();

        return res.status(201).json({
            message: "Book added successfully",
            data: book
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: err.message });
    }
});

// View all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json(books);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;
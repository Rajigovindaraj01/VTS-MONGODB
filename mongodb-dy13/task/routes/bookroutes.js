const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

router.post("/", async (req, res) => {
  const book = await Book.create(req.body);
  res.json(book);
});

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;

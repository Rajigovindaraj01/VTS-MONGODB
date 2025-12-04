const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    publishedYear: {
      type: Number,
      required: [true, "Published year is required"],
      min: [1000, "Year seems invalid"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);

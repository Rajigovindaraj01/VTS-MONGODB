// filename: bookExample_fixed.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day5tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define Book Schema and Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: Number,
  genre: String,
  pages: Number
});

const Book = mongoose.model('Book', bookSchema);

// 3. Function to create a new book
async function createBook(bookData) {
  try {
    const book = new Book(bookData);
    const savedBook = await book.save();
    console.log('Book created:', savedBook);
  } catch (err) {
    console.error('Error creating book:', err.message);
  }
}

// 4. Function to retrieve books by author
async function getBooksByAuthor(authorName) {
  try {
    const books = await Book.find({ author: authorName });
    if (books.length === 0) console.log(`No books found for author: ${authorName}`);
    else console.log(`Books by ${authorName}:`, books);
  } catch (err) {
    console.error('Error retrieving books:', err.message);
  }
}

// 5. Example usage
(async () => {
  await createBook({ title: 'The Silent Patient', author: 'Alex Michaelides', publishedYear: 2019, genre: 'Thriller', pages: 336 });
  await createBook({ title: 'The Maidens', author: 'Alex Michaelides', publishedYear: 2021, genre: 'Thriller', pages: 400 });
  await createBook({ title: 'Educated', author: 'Tara Westover', publishedYear: 2018, genre: 'Memoir', pages: 352 });

  await getBooksByAuthor('Alex Michaelides');

  // Close connection properly
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
})();

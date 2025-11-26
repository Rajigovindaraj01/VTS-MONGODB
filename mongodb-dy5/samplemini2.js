// moviedb.js
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/moviedb")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(err => console.log("Connection Error:", err));

// 2. Movie Schema
const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  releaseYear: Number
});

// 3. Movie Model
const Movie = mongoose.model("Movie", movieSchema);

// 4. Create + Read Example
async function run() {
  try {
    // Add a new movie
    const newMovie = await Movie.create({
      title: "Inception",
      director: "Christopher Nolan",
      releaseYear: 2010
    });

    console.log("Movie added:", newMovie);

    // Find movies released after 2000
    const movies = await Movie.find({ releaseYear: { $gt: 2000 } });

    console.log("Movies released after 2000:", movies);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error:", err);
  }
}

run();

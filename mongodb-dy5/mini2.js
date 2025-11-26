// filename: movieExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day5tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define Movie Schema and Model
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: String
});

const Movie = mongoose.model('Movie', movieSchema);

// 3. Function to add a new movie
async function addMovie(movieData) {
  try {
    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    console.log('Movie added:', savedMovie);
  } catch (err) {
    console.error('Error adding movie:', err.message);
  }
}

// 4. Function to fetch movies released after a certain year
async function getMoviesAfterYear(year) {
  try {
    const movies = await Movie.find({ releaseYear: { $gt: year } });
    if (movies.length === 0) {
      console.log(`No movies found released after ${year}`);
    } else {
      console.log(`Movies released after ${year}:`, movies);
    }
  } catch (err) {
    console.error('Error fetching movies:', err.message);
  }
}

// 5. Example usage
(async () => {
  // Add new movies
  await addMovie({ title: 'Inception', director: 'Christopher Nolan', releaseYear: 2010, genre: 'Sci-Fi' });
  await addMovie({ title: 'The Dark Knight', director: 'Christopher Nolan', releaseYear: 2008, genre: 'Action' });
  await addMovie({ title: 'Interstellar', director: 'Christopher Nolan', releaseYear: 2014, genre: 'Sci-Fi' });

  // Fetch movies released after 2010
  await getMoviesAfterYear(2010);

  // Close the connection
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
})();

// filename: findByIdUser.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day5-tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// 3. Find a user by ID
async function findUserById(id) {
  try {
    const user = await User.findById(id);
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('No user found with ID:', id);
    }
  } catch (err) {
    console.error('Error finding user by ID:', err);
  } finally {
    mongoose.connection.close(); // Close connection
  }
}

// 4. Run the query
findUserById('651234abcd567890ef123456'); // Replace with a real MongoDB _id

// filename: findOneUser.js

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

// 3. Find a single user by a field
async function findSingleUserByName(name) {
  try {
    const user = await User.findOne({ name: name });
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('No user found with name:', name);
    }
  } catch (err) {
    console.error('Error finding user:', err);
  } finally {
    mongoose.connection.close(); // Close connection
  }
}

// 4. Run the query
findSingleUserByName('Raji'); // Replace 'Raji' with any name you want

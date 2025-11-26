// filename: findByIdAndDeleteExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Find and delete a document by ID
async function deleteUserById(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (deletedUser) {
      console.log('Deleted user:', deletedUser);
    } else {
      console.log('No user found with the given ID');
    }
  } catch (err) {
    console.error('Error deleting user:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // First, create a user to get an ID
  const newUser = await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });
  console.log('Created user:', newUser);

  // Delete the user by ID
  await deleteUserById(newUser._id);
})();

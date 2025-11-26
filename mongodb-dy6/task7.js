// filename: deleteOneExample.js

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

// 3. Delete a single document
async function deleteUserByEmail(email) {
  try {
    const result = await User.deleteOne({ email });
    console.log(`Matched ${result.deletedCount > 0 ? 1 : 0} document(s) deleted`);
  } catch (err) {
    console.error('Error deleting user:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // First, create a user
  await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });

  // Delete the user
  await deleteUserByEmail('raji@example.com');
})();

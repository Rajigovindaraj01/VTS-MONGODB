// filename: errorHandlingExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Update operation with error handling
async function safeUpdateUser(userId, updateData) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.log('Update failed: No user found with the given ID');
      return;
    }

    console.log('User successfully updated:', updatedUser);
  } catch (err) {
    console.error('Error during update:', err.message);
  }
}

// 4. Delete operation with error handling
async function safeDeleteUser(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.log('Delete failed: No user found with the given ID');
      return;
    }

    console.log('User successfully deleted:', deletedUser);
  } catch (err) {
    console.error('Error during delete:', err.message);
  }
}

// 5. Example usage
(async () => {
  try {
    // Create a user to test
    const newUser = await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });
    console.log('Created user:', newUser);

    // Safe update with valid data
    await safeUpdateUser(newUser._id, { age: 26 });

    // Safe update with invalid data (triggers validation error)
    await safeUpdateUser(newUser._id, { email: 'invalid-email' });

    // Safe delete
    await safeDeleteUser(newUser._id);

    // Try deleting again (no user exists)
    await safeDeleteUser(newUser._id);

  } catch (err) {
    console.error('Unexpected error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
})();

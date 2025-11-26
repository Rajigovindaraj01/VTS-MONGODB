// filename: updateUserExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Update a user's name using updateOne
async function updateUserName(email, newName) {
  try {
    const result = await User.updateOne(
      { email: email },        // Filter: find user by email
      { $set: { name: newName } } // Update: set new name
    );

    if (result.modifiedCount > 0) {
      console.log(`User name updated successfully to "${newName}"`);
    } else {
      console.log('No user found or name is already the same.');
    }
  } catch (err) {
    console.error('Error updating user:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
updateUserName('raji@example.com', 'Rajeshwari');

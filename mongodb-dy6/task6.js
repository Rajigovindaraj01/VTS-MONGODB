// filename: pushArrayExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema & Model with an array field
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hobbies: { type: [String], default: [] }, // Array field
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Add an item to the array using $push
async function addHobbyToUser(email, hobby) {
  try {
    const updatedUser = await User.updateOne(
      { email },             // Filter: find user by email
      { $push: { hobbies: hobby } } // Add hobby to hobbies array
    );

    console.log(`Matched ${updatedUser.matchedCount} user(s)`);
    console.log(`Modified ${updatedUser.modifiedCount} user(s)`);
  } catch (err) {
    console.error('Error adding hobby:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // First, create a user
  await User.create({ name: 'Raji', email: 'raji@example.com', hobbies: ['Reading'] });

  // Push a new hobby
  await addHobbyToUser('raji@example.com', 'Cooking');
})();

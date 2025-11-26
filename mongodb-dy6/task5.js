// filename: incrementFieldExample.js

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

// 3. Increment a numeric field (age)
async function incrementUserAge(email, incrementBy) {
  try {
    const updatedUser = await User.updateOne(
      { email },            // Filter: find user by email
      { $inc: { age: incrementBy } } // Increment the age
    );

    console.log(`Matched ${updatedUser.matchedCount} user(s)`);
    console.log(`Modified ${updatedUser.modifiedCount} user(s)`);
  } catch (err) {
    console.error('Error incrementing age:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // First, create a user
  await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });

  // Increment age by 2
  await incrementUserAge('raji@example.com', 2);
})();

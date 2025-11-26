// filename: updateManyExample.js

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

// 3. Update multiple users (Bulk update)
async function updateMultipleUsers(minAge, increment) {
  try {
    const result = await User.updateMany(
      { age: { $gte: minAge } }, // Filter: users with age >= minAge
      { $inc: { age: increment } } // Update: increment age by `increment`
    );

    console.log(`Matched ${result.matchedCount} users`);
    console.log(`Modified ${result.modifiedCount} users`);
  } catch (err) {
    console.error('Error updating users:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage: increment age by 1 for all users aged 25 or above
updateMultipleUsers(25, 1);

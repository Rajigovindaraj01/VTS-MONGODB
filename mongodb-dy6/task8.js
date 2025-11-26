// filename: deleteManyExample.js

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

// 3. Delete multiple documents
async function deleteUsersAboveAge(minAge) {
  try {
    const result = await User.deleteMany({ age: { $gte: minAge } });
    console.log(`Deleted ${result.deletedCount} user(s) with age >= ${minAge}`);
  } catch (err) {
    console.error('Error deleting users:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // Create some users
  await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });
  await User.create({ name: 'Alex', email: 'alex@example.com', age: 30 });
  await User.create({ name: 'Tara', email: 'tara@example.com', age: 22 });

  // Delete users aged 25 or above
  await deleteUsersAboveAge(25);
})();

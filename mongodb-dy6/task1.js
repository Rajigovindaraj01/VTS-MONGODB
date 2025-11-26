// filename: userModelExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// 3. Create User Model
const User = mongoose.model('User', userSchema);

// 4. Example: create and save a new user
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log('User created:', savedUser);
  } catch (err) {
    console.error('Error creating user:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 5. Run example
createUser({ name: 'Raji', email: 'raji@example.com', age: 25 });

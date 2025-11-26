// filename: connectionManagement.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

const User = mongoose.model('User', userSchema);

// 3. Function with proper connection close
async function runOperations() {
  try {
    // Create a user
    const user = await User.create({
      name: "Raji",
      email: "raji@example.com",
      age: 25
    });
    console.log("User created:", user);

    // Fetch all users
    const users = await User.find();
    console.log("All users:", users);

  } catch (err) {
    console.error("Error occurred:", err.message);
  } finally {
    // ⭐ Proper way to close connection (NO CALLBACKS)
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run
runOperations();

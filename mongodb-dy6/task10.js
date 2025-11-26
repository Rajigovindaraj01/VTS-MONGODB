// filename: updateValidationExample.js

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
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // basic email validation
  },
  age: { type: Number, min: 0 }, // age must be >= 0
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Update a document with validation
async function updateUserEmail(userId, newEmail) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { email: newEmail } },
      { new: true, runValidators: true } // <-- runValidators ensures schema validation
    );

    if (updatedUser) {
      console.log('User updated with validation:', updatedUser);
    } else {
      console.log('No user found with the given ID');
    }
  } catch (err) {
    console.error('Validation error:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // Create a user
  const newUser = await User.create({ name: 'Raji', email: 'raji@example.com', age: 25 });
  console.log('Created user:', newUser);

  // Attempt to update with an invalid email
  await updateUserEmail(newUser._id, 'invalid-email'); // Should trigger validation error

  // Attempt to update with a valid email
  await updateUserEmail(newUser._id, 'rajeshwari@example.com'); // Should succeed
})();

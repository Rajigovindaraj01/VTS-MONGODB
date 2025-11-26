// filename: atomicUpdateExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, default: 0 },
  hobbies: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// 3. Atomic update using multiple operators
async function atomicUpdateUser(email) {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email }, // Filter
      {
        $inc: { age: 1 },              // Increment age by 1
        $push: { hobbies: 'New Hobby' }, // Add a hobby to the array
        $set: { name: 'Rajeshwari' }     // Update name
      },
      { new: true, runValidators: true } // Return updated doc & validate
    );

    if (updatedUser) {
      console.log('Atomic update successful:', updatedUser);
    } else {
      console.log('No user found with email:', email);
    }
  } catch (err) {
    console.error('Error performing atomic update:', err.message);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// 4. Example usage
(async () => {
  // Create a user
  const user = await User.create({ name: 'Raji', email: 'raji@example.com', age: 25, hobbies: ['Reading'] });
  console.log('Created user:', user);

  // Perform atomic update
  await atomicUpdateUser('raji@example.com');
})();

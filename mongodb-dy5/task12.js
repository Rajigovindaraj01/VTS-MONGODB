// filename: errorHandlingExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB with error handling
mongoose.connect('mongodb://127.0.0.1:27017/day5-tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
});

const User = mongoose.model('User', userSchema);

// 3. Create a new user with error handling
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log('User created successfully:', savedUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      console.error('Validation Error:', err.message);
    } else if (err.code === 11000) { // duplicate key error
      console.error('Duplicate Key Error:', err.message);
    } else {
      console.error('Error creating user:', err);
    }
  }
}

// 4. Read users with error handling
async function readUsersByName(name) {
  try {
    const users = await User.find({ name });
    console.log(`Users with name "${name}":`, users);
  } catch (err) {
    console.error('Error reading users:', err);
  }
}

// 5. Run examples
(async () => {
  await createUser({ name: 'Raji', email: 'raji@example.com', age: 25 }); // create user
  await readUsersByName('Raji'); // read users
  mongoose.connection.close();
})();

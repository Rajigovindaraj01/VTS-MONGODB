// filename: projectionQuery.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day5-tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// 3. Select specific fields
async function getUsersWithSelectedFields() {
  try {
    const users = await User.find()
      .select('name email'); // only include 'name' and 'email' fields
    console.log('Users with selected fields:', users);
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    mongoose.connection.close();
  }
}

// 4. Run the query
getUsersWithSelectedFields();

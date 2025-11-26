// filename: sortQuery.js

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

// 3. Sort query results
async function getUsersSortedByAge(order = 'asc') {
  try {
    const sortOrder = order === 'asc' ? 1 : -1; // 1 = ascending, -1 = descending
    const users = await User.find().sort({ age: sortOrder });
    console.log(`Users sorted by age (${order}):`, users);
  } catch (err) {
    console.error('Error fetching sorted users:', err);
  } finally {
    mongoose.connection.close();
  }
}

// 4. Run the query
getUsersSortedByAge('asc');  // ascending order
// getUsersSortedByAge('desc'); // descending order

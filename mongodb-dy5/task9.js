// filename: limitQuery.js

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

// 3. Limit query results
async function getLimitedUsers(limitCount) {
  try {
    const users = await User.find().limit(limitCount);
    console.log(`First ${limitCount} users:`, users);
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    mongoose.connection.close();
  }
}

// 4. Run the query
getLimitedUsers(3); // Fetch only 3 users

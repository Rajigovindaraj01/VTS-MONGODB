// filename: connectionManagement.js

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

// 3. Example function to query users and close connection
async function queryAndClose() {
  try {
    const users = await User.find().limit(5).sort({ age: 1 }).select('name age');
    console.log('Users:', users);
  } catch (err) {
    console.error('Error querying users:', err);
  } finally {
    // 4. Close the connection after queries
    mongoose.connection.close(() => {
      console.log('MongoDB connection closed');
    });
  }
}

// 5. Run the query
queryAndClose();

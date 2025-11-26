

// 1. Import Mongoose
const mongoose = require('mongoose');

// 2. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day5-tasks', {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 3. Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);

// 4. Query users by a specific field value
async function findUsersByName(name) {
  try {
    const users = await User.find({ name: name });
    console.log('Users found:', users);
  } catch (err) {
    console.error('Error finding users:', err);
  } finally {
    mongoose.connection.close(); // Close connection
  }
}

// 5. Run the query
findUsersByName('Raji'); // Replace 'Raji' with any name you want to search

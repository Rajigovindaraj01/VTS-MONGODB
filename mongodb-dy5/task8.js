// filename: queryOperators.js

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

// 3. Query users using $gte and $lte
async function findUsersByAgeRange(minAge, maxAge) {
  try {
    const users = await User.find({
      age: { $gte: minAge, $lte: maxAge } // age between minAge and maxAge
    });
    console.log(`Users aged between ${minAge} and ${maxAge}:`, users);
  } catch (err) {
    console.error('Error querying users:', err);
  } finally {
    mongoose.connection.close();
  }
}

// 4. Run the query
findUsersByAgeRange(18, 25); // Example: find users aged 18 to 25

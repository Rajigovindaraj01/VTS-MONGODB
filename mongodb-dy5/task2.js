const mongoose = require('mongoose');
const User = require('./task1'); 

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/day5-tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function insertUser() {
    try {
        // Create a new user instance
        const newUser = new User({
            name: 'Raji Govindaraj',
            email: 'raji@example.com',
            password: 'secure123',
            age: 24
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        console.log('User inserted successfully:', savedUser);
    } catch (err) {
        console.error('Error inserting user:', err.message);
    } finally {
        // Close the connection after operation
        mongoose.connection.close();
    }
}

// Call the function
insertUser();

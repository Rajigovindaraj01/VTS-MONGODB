// 1. Import Mongoose
const mongoose = require('mongoose');

// 2. Connect to MongoDB (fixed for Mongoose 7+)
mongoose.connect('mongodb://localhost:27017/day5-tasks')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 3. Create a User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age seems invalid']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 4. Compile schema into a model
const User = mongoose.model('day5-task1-User', userSchema);

// 5. Export the model
module.exports = User;

// Optional: Create & save a new user
async function createUser() {
    try {
        const newUser = new User({
            name: 'Raji Govindaraj',
            email: 'raji@example.com',
            password: 'secure123',
            age: 24
        });

        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
    } catch (err) {
        console.error('Error creating user:', err.message);
    }
}

// Uncomment to test creating a user
// createUser();

const mongoose = require('mongoose');

// FIX 1: Remove old options (Mongoose 9 no longer supports them)
mongoose.connect('mongodb://localhost:27017/day7-tasks')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    age: { type: Number, min: [18, 'Must be at least 18'], max: 100 },
    role: { type: String, enum: ['admin', 'user', 'guest'], default: 'user' }
});

const User = mongoose.model('mini1-User', userSchema);

// Test inserting valid and invalid users
async function run() {
    try {
        // FIX 2: Add missing "let"
        let user = new User({
            name: 'Alice',
            email: 'alice@example.com',
            age: 30
        });

        await user.save();
        console.log('User saved:', user);

        // age too low → will throw validation error
        user = new User({
            name: 'Bob',
            email: 'bob@example.com',
            age: 16
        });

        await user.save();

    } catch (error) {
        console.error('Validation Error:', error.message);
    } finally {
        mongoose.connection.close();
    }
}

run();

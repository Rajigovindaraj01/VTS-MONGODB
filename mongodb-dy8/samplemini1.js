const mongoose = require('mongoose');

// FIX: Remove old options (NOT supported)
mongoose.connect('mongodb://localhost:27017/day8-tasks')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Connection Error:", err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    createdAt: Date
});

// fIXED for Mongoose 9 — async middleware
userSchema.pre('save', async function () {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    console.log("Pre-save middleware executed");
});

// FIXED post hook — async format
userSchema.post('save', async function (doc) {
    console.log("User saved:", doc);
});

const User = mongoose.model('samplemini1User', userSchema);

async function run() {
    const user = new User({
        username: "john_doe",
        email: "john@example.com"
    });

    await user.save();
    mongoose.connection.close();
}

run();

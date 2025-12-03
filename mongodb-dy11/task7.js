const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create a UNIQUE index on email
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("task7-user", userSchema);

async function run() {

    await User.init(); // Ensure indexes are created

    try {
        // Insert first document
        await User.create({
            name: "Raji",
            email: "raji@gmail.com",
            age: 24
        });

        // Attempt to insert a duplicate email
        await User.create({
            name: "Govind",
            email: "raji@gmail.com",  // This will throw an error
            age: 30
        });
    } catch (err) {
        console.log("Error:", err.message);
    }

    // Check all users
    const result = await User.find();
    console.log(result);
}

run();

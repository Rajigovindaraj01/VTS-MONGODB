const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number
});

// Create a hashed index on "username"
userSchema.index({ username: "hashed" });

const User = mongoose.model("task11-user", userSchema);

async function run() {

    // Clear collection
    await User.deleteMany({});

    // Insert sample data
    await User.create([
        { username: "raji", email: "raji@gmail.com", age: 24 },
        { username: "govind", email: "govind@gmail.com", age: 30 },
        { username: "meena", email: "meena@gmail.com", age: 28 },
    ]);

    // Equality query — uses hashed index
    const result = await User.find({ username: "govind" }).explain("executionStats");

    console.log("Query Execution Stats with Hashed Index:");
    console.log(result.executionStats);
}

run();

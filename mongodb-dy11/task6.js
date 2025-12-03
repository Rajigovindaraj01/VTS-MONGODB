const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Creating index for testing
userSchema.index({ email: 1 });

const User = mongoose.model("task6-user", userSchema);

async function run() {

    // Wait for index creation
    await User.init();

    // Insert sample data
    await User.create({
        name: "Raji",
        email: "raji@gmail.com",
        age: 24
    });

    // 📌 EXPLAIN QUERY — show how MongoDB executes the query
    const explainResult = await User.find({ email: "raji@gmail.com" })
        .explain("executionStats");

    console.log("Explain Output:");
    console.log(JSON.stringify(explainResult, null, 2));
}

run();

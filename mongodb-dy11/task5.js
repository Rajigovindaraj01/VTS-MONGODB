const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Example index
userSchema.index({ email: 1 });

const User = mongoose.model("task5-user", userSchema);

async function run() {

    // Wait for indexes to build
    await User.init();

    // 📌 List all indexes on this collection
    const indexes = await User.collection.getIndexes();

    console.log("All Indexes: ");
    console.log(indexes);
}

run();

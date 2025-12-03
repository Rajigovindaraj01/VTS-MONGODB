const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create an index on email
userSchema.index({ email: 1 });

const User = mongoose.model("task8-user", userSchema);

async function run() {
    await User.init(); // Ensure indexes are created

    console.log("Indexes before drop:");
    let indexesBefore = await User.collection.getIndexes();
    console.log(indexesBefore);

    // Drop index on "email"
    await User.collection.dropIndex("email_1");  // Use index name

    console.log("Indexes after drop:");
    let indexesAfter = await User.collection.getIndexes();
    console.log(indexesAfter);
}

run();

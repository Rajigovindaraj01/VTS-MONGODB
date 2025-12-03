const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Create an index for demonstration
userSchema.index({ email: 1 });

const User = mongoose.model("task12-user", userSchema);

async function run() {
    await User.init(); // Ensure indexes are created

    // Get collection stats
    const stats = await User.collection.stats();
    
    console.log("Collection Stats:");
    console.log("Total Document Count:", stats.count);
    console.log("Storage Size (bytes):", stats.storageSize);
    console.log("Total Index Size (bytes):", stats.totalIndexSize);
    console.log("Index Sizes (bytes):", stats.indexSizes);
}

run();

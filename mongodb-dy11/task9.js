const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model("task9-user", userSchema);

async function run() {

    // Clear collection first
    await User.deleteMany({});

    // Insert 10000 sample documents
    const bulkData = [];
    for (let i = 0; i < 10000; i++) {
        bulkData.push({
            name: "User" + i,
            email: `user${i}@example.com`,
            age: Math.floor(Math.random() * 60) + 18
        });
    }
    await User.insertMany(bulkData);
    console.log("Inserted 10000 documents");

    // -----------------------
    // Query WITHOUT index
    // -----------------------
    console.time("Query without index");
    let result1 = await User.find({ email: "user5000@example.com" });
    console.timeEnd("Query without index");

    const explainWithoutIndex = await User.find({ email: "user5000@example.com" }).explain("executionStats");
    console.log("Explain without index:", explainWithoutIndex.executionStats);

    // -----------------------
    // Create index on email
    // -----------------------
    await User.collection.createIndex({ email: 1 });
    console.log("Index on email created");

    // Query WITH index
    console.time("Query with index");
    let result2 = await User.find({ email: "user5000@example.com" });
    console.timeEnd("Query with index");

    const explainWithIndex = await User.find({ email: "user5000@example.com" }).explain("executionStats");
    console.log("Explain with index:", explainWithIndex.executionStats);
}

run();

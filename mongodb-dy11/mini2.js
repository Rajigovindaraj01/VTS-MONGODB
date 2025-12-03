const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    age: Number
});

// Create a compound index: lastName ASC, firstName ASC
userSchema.index({ lastName: 1, firstName: 1 });

const User = mongoose.model("mini2users", userSchema);

async function run() {

    // Clear collection
    await User.deleteMany({});

    // Insert sample data
    const users = [
        { firstName: "Raji", lastName: "Govind", email: "raji@gmail.com", age: 24 },
        { firstName: "Meena", lastName: "Govind", email: "meena@gmail.com", age: 28 },
        { firstName: "Govind", lastName: "Rao", email: "govind@gmail.com", age: 30 },
        { firstName: "Anu", lastName: "Rao", email: "anu@gmail.com", age: 26 },
        { firstName: "Suresh", lastName: "Kumar", email: "suresh@gmail.com", age: 32 }
    ];
    await User.insertMany(users);
    console.log("Inserted sample users");

    // Query filtering by both lastName and firstName
    const query = { lastName: "Govind", firstName: "Raji" };
    
    // Without explain
    const result = await User.find(query);
    console.log("Query Result:");
    console.log(result);

    // With explain to check index usage
    const explainResult = await User.find(query).explain("executionStats");
    console.log("Explain Output:");
    console.log(JSON.stringify(explainResult.executionStats, null, 2));
}

run();

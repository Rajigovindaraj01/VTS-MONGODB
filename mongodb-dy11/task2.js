const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(()=>console.log("MONGODB CONNECTED"))
.catch(err=> console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// 📌 Compound index on name (ASC) and age (DESC)
userSchema.index({ name: 1, age: -1 });

const user = mongoose.model("task2-user", userSchema);

async function run() {
    
    await user.create({
        name: "Raji",
        email: "raji@gmail.com",
        age: 24
    });

    // Query that uses compound index
    const result = await user.findOne({ name: "Raji", age: 24 });

    console.log(result);
}

run();

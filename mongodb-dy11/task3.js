const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    skills: [String],   // Array field → multikey index
    age: Number
});

// 📌 Multikey index on array field "skills"
userSchema.index({ skills: 1 });

const User = mongoose.model("task3-user", userSchema);

async function run() {

    await User.create({
        name: "Raji",
        skills: ["node", "react", "mongodb"],
        age: 24
    });

    // Query using multikey index
    const result = await User.find({ skills: "react" });

    console.log(result);
}

run();

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day5-tasks")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('dy5-task4-User', UserSchema);

async function createAndFindUser() {
  try {
    const user = await User.create({
      name: "Raji",
      age: 24,
      email: "raji@gmail.com"
    });
    console.log("User Created:", user);
    const users = await User.find();
    console.log("All Users:", users);

  } catch (err) {
    console.log(err.message);
  }
}

createAndFindUser();

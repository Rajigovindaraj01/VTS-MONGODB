const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day4-tasks");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});


const User = mongoose.model('task9-day4', UserSchema);

User.create({ name: "Raji", age: 24, email: "raji@gmail.com" })
  .then(() => console.log("User saved"))
  .catch(err => console.log(err));

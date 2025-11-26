const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day4-tasks")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const User = mongoose.model('day4-task10', UserSchema);


const newUser = new User({
  name: "Raji",
  age: 24,
  email: "raji@gmail.com"
});

newUser.save()
  .then(() => console.log("Document saved successfully"))
  .catch(err => console.log(err));

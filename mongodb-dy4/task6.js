const mongoose = require('mongoose');

const BasicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"],
    max: [100, "Age cannot be more than 100"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  status: {
    type: String,
    default: "active"
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager", "guest"],
    default: "user"
  }
});

module.exports = mongoose.model('Basic', BasicSchema);

const mongoose = require('mongoose');

const BasicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  status: {
    type: String,
    default: "active" 
  }
});

module.exports = mongoose.model('Basic', BasicSchema);

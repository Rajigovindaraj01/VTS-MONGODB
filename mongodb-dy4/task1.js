const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/day4-tasks');

const BasicSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

const Basic = mongoose.model('day4-task1', BasicSchema);

module.exports = Basic;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongodb-day3', { useNewUrlParser:
true, useUnifiedTopology: true });
const userSchema = new mongoose.Schema({
 name: String,
 age: Number,
 email: { type: String, required: true, unique: true }
});
const User = mongoose.model('User', userSchema);
const user = new User({ name: 'John Doe', age: 30, email: 'john@example.com'
});
user.save()
 .then(doc => {
 console.log("User created:", doc);
 return User.find({ age: { $gte: 18 } });
 })
 .then(users => {
 console.log("Users aged 18 or more:", users);
 return User.updateOne({ email: 'john@example.com' }, { age: 31 });
 }) .then(updateResult => {
 console.log("Update Result:", updateResult);
 return User.deleteOne({ email: 'john@example.com' });
 })
 .then(deleteResult => {
 console.log("Delete Result:", deleteResult);
 mongoose.connection.close();
 })
 .catch(err => console.error(err));
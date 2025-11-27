const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true },
      age: { type: Number, required: true }
    });

    // Pre-save middleware with error handling
    userSchema.pre('save', function(next) {
      if (this.age < 18) {
        // Throw an error to prevent saving
        return next(new Error("User must be at least 18 years old!"));
      }
      console.log(`User ${this.username} passed pre-save checks`);
      next();
    });

    const User = mongoose.model("task11User", userSchema);

    // Attempt to save invalid user
    const user = new User({ username: "Raji", email: "raji@test.com", age: 15 });

    try {
      await user.save();
      console.log("User saved successfully");
    } catch (err) {
      console.error("Error in middleware:", err.message);
    }

    // Attempt to save valid user
    const validUser = new User({ username: "Ravi", email: "ravi@test.com", age: 25 });
    await validUser.save();
    console.log("Valid user saved successfully");

  } catch (err) {
    console.error("Connection Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

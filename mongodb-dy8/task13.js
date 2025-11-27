const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true }
    });

    // First pre-save middleware
    userSchema.pre('save', function() {
      console.log("Middleware 1: Checking username length");
      if (this.username.length < 3) {
        throw new Error("Username must be at least 3 characters");
      }
    });

    // Second pre-save middleware
    userSchema.pre('save', function() {
      console.log("Middleware 2: Normalizing email to lowercase");
      this.email = this.email.toLowerCase();
    });

    // Third pre-save middleware
    userSchema.pre('save', function() {
      console.log("Middleware 3: Logging before save");
    });

    const User = mongoose.model("task13User", userSchema);

    // Create a user
    const user = new User({ username: "Raji", email: "RAJI@TEST.COM" });

    await user.save();

    console.log("User saved successfully");
    console.log("Final email:", user.email);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      }
    });

    // Pre-validate middleware
    userSchema.pre('validate', function() {
      // Normalize username to lowercase before validation
      if (this.username) {
        this.username = this.username.toLowerCase();
        console.log(`Username normalized to: ${this.username}`);
      }
    });

    const User = mongoose.model("task3User", userSchema);

    // Create and validate a user
    const user = new User({ username: "RAJI", email: "raji@test.com" });
    await user.validate(); // triggers pre-validate middleware

    console.log("Validation completed successfully");
    console.log("Final username:", user.username);

  } catch (err) {
    if (err.name === "ValidationError") {
      Object.values(err.errors).forEach(error => {
        console.log(`Validation error for ${error.path}: ${error.message}`);
      });
    } else {
      console.error("Error:", err.message);
    }
  } finally {
    mongoose.connection.close();
  }
})();

const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // Custom validator function
    function onlyLetters(value) {
      return /^[A-Za-z]+$/.test(value);   // must contain only A–Z or a–z
    }

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Username is required"],
        validate: {
          validator: onlyLetters,
          message: "Username must contain only alphabetic characters"
        }
      },

      email: {
        type: String,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      },

      password: {
        type: String,
        required: true,
        minlength: [8, "Password must be at least 8 characters"]
      }
    });

    const User = mongoose.model("task6User", userSchema);

    // Test data
    const user = await User.create({
      username: "Raji",
      email: "raji@test.com",
      password: "password123"
    });

    console.log("User Created:", user);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();

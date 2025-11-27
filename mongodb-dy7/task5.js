const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [20, "Name must be at most 20 characters"]
      },

      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      },

      phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]
      },

      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
        maxlength: [30, "Password must be at most 30 characters"]
      }
    });

    const User = mongoose.model("task5User", userSchema);

    const user = await User.create({
      name: "Raji Govindaraj",
      email: "raji@test.com",
      phone: "9876543210",
      password: "password123"
    });

    console.log("User Created:", user);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();

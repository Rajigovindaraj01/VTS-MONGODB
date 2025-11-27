const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("✅ MongoDB Connected");

    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
      },
      age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be 60 or below"]
      }
    });

    const User = mongoose.model("task2User", userSchema);

    const user = await User.create({
      name: "Raji",
      email: "raji@test.com",
      password: "password123",
      age: 22
    });

    console.log("🎉 User Created:", user);

  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();

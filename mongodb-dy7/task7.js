const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      },
      role: {
        type: String,
        enum: ["admin", "user", "manager"],
        default: "user"
      },
      isActive: {
        type: Boolean,
        default: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });

    const User = mongoose.model("task7User", userSchema);

    // Create a user without specifying role or isActive
    const user = await User.create({
      name: "Raji",
      email: "raji@test.com"
    });

    console.log("User Created:", user);

  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();

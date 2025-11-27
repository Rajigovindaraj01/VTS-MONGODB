const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

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
      },
      age: {
        type: Number,
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be 60 or below"]
      }
    });

    const User = mongoose.model("task13User", userSchema);

    // Attempt to create invalid user
    try {
      await User.create({
        username: "Ra",         // too short
        email: "invalid-email", // invalid format
        age: 15                 // below min
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        console.log("Validation Errors:");
        Object.values(err.errors).forEach(error => {
          console.log(`Field: ${error.path}, Message: ${error.message}`);
        });
      } else {
        console.error("Other error:", err);
      }
    }

  } catch (err) {
    console.error("Connection Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

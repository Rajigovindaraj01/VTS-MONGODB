const mongoose = require('mongoose');

(async () => {
  try {
    // 1) Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // 2) Define User schema
    const userSchema = new mongoose.Schema({
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      },
      age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be 60 or below"]
      },
      role: {
        type: String,
        required: [true, "Role is required"],
        enum: {
          values: ["admin", "user", "manager"],
          message: "Role must be admin, user, or manager"
        }
      }
    });

    // 3) Create User model
    const User = mongoose.model("mini1User", userSchema);

    // 4) Attempt to insert invalid data
    const invalidUser = {
      email: "invalid-email",   // invalid email
      age: 15,                  // below min
      role: "superadmin"        // invalid enum
    };

    try {
      await User.create(invalidUser);
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

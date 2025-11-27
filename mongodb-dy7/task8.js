const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // Custom validator: username must contain only letters
    function onlyLetters(value) {
      return /^[A-Za-z]+$/.test(value);
    }

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username must be at most 20 characters"],
        validate: {
          validator: onlyLetters,
          message: "Username must contain only letters"
        }
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
      age: {
        type: Number,
        min: [18, "Age must be at least 18"],
        max: [60, "Age must be 60 or below"]
      },
      role: {
        type: String,
        enum: ["admin", "user", "manager"],
        default: "user"
      }
    });

    const User = mongoose.model("task8User", userSchema);

    // Attempt to create an invalid user
    const invalidUserData = {
      username: "Raji123",       // invalid: contains numbers
      email: "raji@@test.com",   // invalid email
      phone: "98765",            // invalid phone
      age: 15,                   // invalid: less than min 18
      role: "superadmin"         // invalid enum
    };

    try {
      await User.create(invalidUserData);
    } catch (error) {
      if (error.name === "ValidationError") {
        // Loop through each validation error
        for (let field in error.errors) {
          console.log(`Validation error for ${field}: ${error.errors[field].message}`);
        }
      } else {
        console.error("Other error:", error);
      }
    }

  } catch (error) {
    console.error("Connection Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
})();

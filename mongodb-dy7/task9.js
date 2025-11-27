const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // Custom validator function
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

    const User = mongoose.model("task9User", userSchema);

    // Create a document instance WITHOUT saving
    const user = new User({
      username: "Raji123",     // invalid: contains numbers
      email: "invalid-email",  // invalid email
      age: 15,                 // invalid: below min
      role: "superadmin"       // invalid enum
    });

    // Manually validate
    try {
      await user.validate();  // throws ValidationError if invalid
      console.log("Validation passed!");
    } catch (err) {
      if (err.name === "ValidationError") {
        for (let field in err.errors) {
          console.log(`Validation error for ${field}: ${err.errors[field].message}`);
        }
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

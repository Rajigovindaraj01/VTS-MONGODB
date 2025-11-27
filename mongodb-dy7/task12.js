const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // Custom validator: only letters
    function onlyLetters(value) {
      return /^[A-Za-z]+$/.test(value);
    }

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Username is required"],
        minlength: [3, "Username must be at least 3 characters"],
        maxlength: [20, "Username must be at most 20 characters"],
        validate: [
          { validator: onlyLetters, message: "Username must contain only letters" },
          {
            // Async validator: unique username
            validator: async function(value) {
              const count = await mongoose.models.User.countDocuments({ username: value });
              return count === 0;
            },
            message: "Username already exists"
          }
        ]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      }
    });

    const User = mongoose.model("task12User", userSchema);

    // Test creating a user
    try {
      const user1 = await User.create({
        username: "Raji",
        email: "raji@test.com"
      });

      // Attempt duplicate username
      const user2 = await User.create({
        username: "Raji",  // duplicate
        email: "raji2@test.com"
      });
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

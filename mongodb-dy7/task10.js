const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    const userSchema = new mongoose.Schema({
      username: {
        type: String,
        required: [true, "Username is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
        validate: {
          // Async validator to check uniqueness
          validator: async function(value) {
            const count = await mongoose.models.User.countDocuments({ email: value });
            return count === 0;
          },
          message: "Email already exists"
        }
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
      }
    });

    const User = mongoose.model("task10User", userSchema);

    // Try creating a user with duplicate email
    try {
      const user1 = await User.create({
        username: "Raji",
        email: "raji@test.com",
        password: "password123"
      });

      const user2 = await User.create({
        username: "Rajesh",
        email: "raji@test.com", // duplicate email
        password: "password456"
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

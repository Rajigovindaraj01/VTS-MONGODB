const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
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
      }
    });

    // Pre-validate middleware: normalize username
    userSchema.pre('validate', function() {
      if (this.username) {
        this.username = this.username.toLowerCase();
      }
    });

    // Post-validate middleware: log validation result
    userSchema.post('validate', function(doc) {
      console.log(`Validation completed for username: ${doc.username}, email: ${doc.email}`);
    });

    const User = mongoose.model("task4User", userSchema);

    // Create a user instance
    const user = new User({ username: "RAJI", email: "raji@test.com" });

    // Trigger validation manually
    await user.validate();

    console.log("User passed validation");

  } catch (err) {
    if (err.name === "ValidationError") {
      console.log("Validation failed with errors:");
      Object.values(err.errors).forEach(error => {
        console.log(`Field: ${error.path}, Message: ${error.message}`);
      });
    } else {
      console.error("Error:", err.message);
    }
  } finally {
    mongoose.connection.close();
  }
})();

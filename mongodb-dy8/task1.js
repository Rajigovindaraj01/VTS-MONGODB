const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"]
      }
    });

    // Pre-save middleware (async style, no next)
    userSchema.pre('save', async function() {
      console.log(`About to save user: ${this.name} with email: ${this.email}`);
      // You can also do async operations here if needed
    });

    const User = mongoose.model("task1User", userSchema);

    // Create and save a user
    const user = new User({ name: "Raji", email: "raji@test.com" });
    await user.save();

    console.log("User saved successfully");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

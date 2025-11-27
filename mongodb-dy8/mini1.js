const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true },
      createdAt: { type: Date }
    });

    // Pre-save middleware: set createdAt if not present
    userSchema.pre('save', function() {
      if (!this.createdAt) {
        this.createdAt = new Date();
        console.log(`createdAt set to: ${this.createdAt}`);
      }
    });

    const User = mongoose.model("mini1", userSchema);

    // Create a new user
    const user = new User({ username: "Raji", email: "raji@test.com" });
    await user.save();

    console.log("User saved successfully");
    console.log("User createdAt:", user.createdAt);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

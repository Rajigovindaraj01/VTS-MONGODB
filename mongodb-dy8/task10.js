const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true }
    });

    // Pre-save middleware to hash password
    userSchema.pre('save', async function() {
      if (!this.isModified('password')) return; // skip if password not changed
      console.log(`Hashing password for user: ${this.username}`);

      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      console.log(`Password hashed for user: ${this.username}`);
    });

    const User = mongoose.model("task10User", userSchema);

    // Create and save a user
    const user = new User({
      username: "Raji",
      email: "raji@test.com",
      password: "mySecret123"
    });

    await user.save();

    console.log("User saved successfully");
    console.log("Hashed password:", user.password);

    // Optional: verify password
    const isMatch = await bcrypt.compare("mySecret123", user.password);
    console.log("Password match:", isMatch);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

const mongoose = require('mongoose');

(async () => {
  try {
    // 1) MongoDB Connect (NO extra options)
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("✅ MongoDB Connected");

    // 2) Schema + Required Validation
    const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Name is required"]
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+@.+\..+/, "Invalid email"]
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
      }
    });

    // 3Model
    const User = mongoose.model('task1User', userSchema);

    //4) Insert User
    const user = await User.create({
      name: "Raji",
      email: "raji@test.com",
      password: "password123"
    });

    console.log("🎉 User Created:", user);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
})();

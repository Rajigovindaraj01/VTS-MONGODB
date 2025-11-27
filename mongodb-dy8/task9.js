const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true }
    });

    // Async pre-save middleware
    userSchema.pre('save', async function() {
      console.log(`Starting async pre-save operation for user: ${this.name}`);

      // Simulate async operation (e.g., API call, hashing)
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay

      console.log(`Async pre-save operation completed for user: ${this.name}`);
    });

    const User = mongoose.model("task9User", userSchema);

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

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

    // Post-save middleware (runs after document is saved)
    userSchema.post('save', function(doc) {
      console.log(`User saved: ${doc.name} with email: ${doc.email}`);
    });

    const User = mongoose.model("task2User", userSchema);

    // Create and save a user
    const user = new User({ name: "Raji", email: "raji@test.com" });
    await user.save();

    console.log("Save operation completed");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

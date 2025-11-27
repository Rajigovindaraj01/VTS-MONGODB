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

    // Post-updateOne middleware
    userSchema.post('updateOne', async function(result) {
      console.log("UpdateOne operation completed");
      console.log("Result:", result); // contains info about matchedCount, modifiedCount, etc.
    });

    const User = mongoose.model("task8User", userSchema);

    // Create a user
    const user = await User.create({ name: "Raji", email: "raji@test.com" });

    // Perform updateOne
    await User.updateOne({ _id: user._id }, { $set: { email: "raji_updated@test.com" } });

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

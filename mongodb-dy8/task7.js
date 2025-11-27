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

    // Pre-updateOne middleware
    userSchema.pre('updateOne', function(next) {
      // 'this' refers to the query object
      console.log("About to update a document with conditions:", this.getQuery());
      console.log("Update payload:", this.getUpdate());
      next();
    });

    const User = mongoose.model("task7User", userSchema);

    // Create a user
    const user = await User.create({ name: "Raji", email: "raji@test.com" });

    // Perform updateOne
    await User.updateOne({ _id: user._id }, { $set: { email: "raji_updated@test.com" } });

    console.log("UpdateOne operation completed");

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

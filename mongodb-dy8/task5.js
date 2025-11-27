const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      role: { type: String, enum: ["admin", "user"], default: "user" }
    });

    // Pre-remove middleware
    userSchema.pre('remove', function(next) {
      if (this.role === "admin") {
        const err = new Error("Admin users cannot be deleted!");
        return next(err); // prevent deletion
      }
      console.log(`User ${this.name} is allowed to be deleted.`);
      next();
    });

    const User = mongoose.model("task5User", userSchema);

    // Create sample users
    const adminUser = await User.create({ name: "AdminUser", email: "admin@test.com", role: "admin" });
    const normalUser = await User.create({ name: "NormalUser", email: "user@test.com", role: "user" });

    // Attempt to remove normal user
    try {
      await normalUser.remove();
      console.log("Normal user deleted successfully");
    } catch (err) {
      console.error("Error deleting normal user:", err.message);
    }

    // Attempt to remove admin user
    try {
      await adminUser.remove();
      console.log("Admin user deleted successfully");
    } catch (err) {
      console.error("Error deleting admin user:", err.message);
    }

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

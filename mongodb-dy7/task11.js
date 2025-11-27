const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // Nested Schema: Address
    const addressSchema = new mongoose.Schema({
      street: { type: String, required: [true, "Street is required"] },
      city: { type: String, required: [true, "City is required"] },
      zip: {
        type: String,
        required: [true, "ZIP code is required"],
        match: [/^\d{5}$/, "ZIP code must be 5 digits"]
      }
    });

    // Parent Schema: User
    const userSchema = new mongoose.Schema({
      name: { type: String, required: [true, "Name is required"] },
      email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
      },
      address: { type: addressSchema, required: true }  // Nested Schema
    });

    const User = mongoose.model("task11User", userSchema);

    // Create user with nested address
    const user = await User.create({
      name: "Raji",
      email: "raji@test.com",
      address: {
        street: "123 Main St",
        city: "Chennai",
        zip: "600001"
      }
    });

    console.log("User Created:", user);

  } catch (err) {
    if (err.name === "ValidationError") {
      for (let field in err.errors) {
        console.log(`Validation error for ${field}: ${err.errors[field].message}`);
      }
    } else {
      console.error("Error:", err.message);
    }
  } finally {
    mongoose.connection.close();
  }
})();

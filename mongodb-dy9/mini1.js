const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Address Subdocument Schema ----
const AddressSchema = new Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
});

// ---- 2) User Schema with embedded addresses ----
const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  addresses: [AddressSchema] // embedded array of addresses
});

const User = model("User", UserSchema);

// ---- 3) Example Insert ----
async function createUser() {
  const user = await User.create({
    name: "John Doe",
    email: "john@example.com",
    password: "securepassword",
    addresses: [
      { street: "123 Main St", city: "Chennai", state: "TN", zipCode: "600001", country: "India" },
      { street: "456 Park Ave", city: "Bangalore", state: "KA", zipCode: "560001", country: "India" }
    ]
  });

  console.log("Inserted User:", user);
}

// Run example
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => createUser())
  .catch(err => console.log(err));

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Profile Schema (Referenced) ----
const ProfileSchema = new Schema({
  age: Number,
  bio: String
});
const Profile = model("task6userProfile", ProfileSchema);

// ---- 3) User Schema with ObjectId Reference (One-to-One) ----
const UserSchema = new Schema({
  name: String,
  email: String,
  profile: {
    type: Schema.Types.ObjectId,
    ref: "userProfile"  // Reference to Profile
  }
});
const User = model("task6userAccount", UserSchema);

// ---- 4) Insert Sample One-to-One Documents ----
async function insertData() {
  try {
    // Create Profile first
    const profile = await Profile.create({ age: 25, bio: "Developer" });

    // Create User referencing the Profile
    const user = await User.create({
      name: "Alice",
      email: "alice@example.com",
      profile: profile._id
    });

    console.log("Inserted User with Profile:", user);

    // Fetch User with populated Profile
    const userWithProfile = await User.findById(user._id).populate("profile");
    console.log("User populated:", userWithProfile);

  } catch (err) {
    console.log(err);
  }
}

insertData();

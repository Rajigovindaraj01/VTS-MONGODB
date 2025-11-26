const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// -------------------------------
// 1️Connect to MongoDB
// -------------------------------
mongoose.connect('mongodb://localhost:27017/day4-tasks')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// -------------------------------
// 2️Department Schema & Model
// -------------------------------
const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true }
});
const Department = mongoose.model('task12-Department', DepartmentSchema);

// -------------------------------
// 3 User Schema & Model (All validations, nested, array, enum, default)
// -------------------------------
const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  age: { type: Number, required: [true, "Age is required"], min: [1, "Age must be at least 1"], max: [100, "Age cannot exceed 100"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  status: { type: String, default: "active" },
  role: { type: String, enum: ["user", "admin", "manager", "guest"], default: "user" },
  hobbies: { type: [String], default: [] },
  address: { street: String, city: String, pincode: Number },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
});
const User = mongoose.model('User', UserSchema);

// ------------------------------
// 4️Route to Create User
// -------------------------------
app.get('/create', async (req, res) => {
  try {
    const dept = await Department.create({ deptName: "IT" });
    const user = await User.create({
      name: "Raji",
      age: 24,
      email: "raji@gmail.com",
      hobbies: ["coding", "reading"],
      address: { street: "10/22 Main Road", city: "Thanjavur", pincode: 613001 },
      department: dept._id
    });
    res.send({ message: "User Created", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      res.status(400).send({ validationErrors: messages });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
});

// -------------------------------
// 5️Route to Fetch Users + Populate Department
// -------------------------------
app.get('/users', async (req, res) => {
  try {
    const data = await User.find().populate("department");
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// -------------------------------
// 6️Route to Update User (with validation handling)
// -------------------------------
app.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).send({ message: "User not found" });

    res.send({ message: "User updated", updatedUser });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      res.status(400).send({ validationErrors: messages });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
});

// -------------------------------
// 7️Route for Manual Validation (.validate())
// -------------------------------
app.post('/validate', async (req, res) => {
  try {
    const user = new User(req.body); // create instance but do NOT save
    await user.validate();
    res.send({ message: "Document is valid ✅", data: req.body });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(e => e.message);
      res.status(400).send({ validationErrors: messages });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
});

// -------------------------------
//Start Server
// -------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));

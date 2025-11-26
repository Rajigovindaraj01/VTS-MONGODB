const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// -------------------------------
// 1️ Connect to MongoDB
// -------------------------------
mongoose.connect('mongodb://localhost:27017/day5-tasks')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// -------------------------------
// 2️Department Schema & Model
// -------------------------------
const DepartmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true }
});
const Department = mongoose.model('dy5-task3-Department', DepartmentSchema);

// -------------------------------
// 3️User Schema & Model (All validations, nested, array, enum, default)
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

// -------------------------------
// 4Route to Create User (Alternative using Model.create())
// -------------------------------
app.post('/create-user', async (req, res) => {
  try {
    // Optional: create a default department if not provided
    let deptId;
    if (req.body.departmentName) {
      const dept = await Department.create({ deptName: req.body.departmentName });
      deptId = dept._id;
    }

    // Use Model.create() directly
    const userData = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      status: req.body.status,
      role: req.body.role,
      hobbies: req.body.hobbies,
      address: req.body.address,
      department: deptId
    };

    const user = await User.create(userData);

    res.send({ message: "User created successfully ✅", user });

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

    res.send({ message: "User updated ✅", updatedUser });

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
// Start Server
// -------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// -----------------------------------------------
// 1) CONNECT TO MONGODB
// -----------------------------------------------
mongoose.connect('mongodb://localhost:27017/day4-tasks')
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));


// -----------------------------------------------
// 2) DEPARTMENT SCHEMA
// -----------------------------------------------
const DepartmentSchema = new mongoose.Schema({
  deptName: {
    type: String,
    required: true
  }
});

const Department = mongoose.model("day4-task8", DepartmentSchema);


// -----------------------------------------------
// 3) BASIC SCHEMA (WITH ALL VALIDATIONS)
// -----------------------------------------------
const BasicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"],
    max: [100, "Age cannot be more than 100"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  status: {
    type: String,
    default: "active"
  },
  role: {
    type: String,
    enum: ["user", "admin", "manager", "guest"],
    default: "user"
  },

  hobbies: {
    type: [String],
    default: []
  },

  address: {
    street: String,
    city: String,
    pincode: Number
  },

  // Reference field (ObjectId)
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department"
  }
});

const Basic = mongoose.model("Basic", BasicSchema);


// -----------------------------------------------
// 4) ROUTE TO CREATE DATA
// -----------------------------------------------
app.get('/create', async (req, res) => {
  try {
    // Create a new department
    const dept = await Department.create({ deptName: "IT" });

    // Create a new user referencing department
    const user = await Basic.create({
      name: "Raji",
      age: 24,
      email: "raji@gmail.com",
      hobbies: ["coding", "reading"],
      address: {
        street: "10/22 Main Road",
        city: "Thanjavur",
        pincode: 613001
      },
      department: dept._id
    });

    res.send({ message: "User Created", user });

  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


// -----------------------------------------------
// 5) ROUTE TO POPULATE DATA
// -----------------------------------------------
app.get('/users', async (req, res) => {
  try {
    const data = await Basic.find().populate("department");
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});


// -----------------------------------------------
// 6) START SERVER
// -----------------------------------------------
app.listen(5000, () => console.log("Server running on port 5000"));

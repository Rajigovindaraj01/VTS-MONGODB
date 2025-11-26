const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/testdb')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// Mongoose Schema + Model in same file
const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  registeredDate: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// API to Add Customer
app.post('/add-customer', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const saved = await newCustomer.save();
    res.json({ message: "Customer Saved", data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));

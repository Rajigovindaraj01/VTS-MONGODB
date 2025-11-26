// mini1_customer.js
const mongoose = require('mongoose');

// 1️Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day4-tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 2️Define Customer Schema
const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phoneNumber: { type: String, required: true },
    registeredDate: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);

// 3️CRUD Examples
async function run() {
    // Create customer
    const newCustomer = new Customer({
        firstName: 'Raji',
        lastName: 'Govindaraj',
        email: 'raji@example.com',
        phoneNumber: '9876543210'
    });
    await newCustomer.save();
    console.log('Customer Created:', newCustomer);

    // Read customers
    const customers = await Customer.find();
    console.log('All Customers:', customers);

    // Update customer
    await Customer.updateOne({ email: 'raji@example.com' }, { phoneNumber: '9123456780' });
    console.log('Customer Updated');

    // Delete customer
    // await Customer.deleteOne({ email: 'raji@example.com' });
    // console.log('Customer Deleted');

    mongoose.connection.close();
}

run();

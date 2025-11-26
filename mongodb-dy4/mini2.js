// mini2_order.js
const mongoose = require('mongoose');

// 1️Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day4-tasks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// 2️Customer Schema (for reference)
const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    registeredDate: { type: Date, default: Date.now }
});
const Customer = mongoose.model('Customer', customerSchema);

// 3️Order Schema
const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [
        { name: String, quantity: Number, price: Number }
    ],
    totalAmount: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// 4️CRUD Examples
async function run() {
    // Create a customer first
    const customer = new Customer({
        firstName: 'Raji',
        lastName: 'Govindaraj',
        email: 'raji2@example.com',
        phoneNumber: '9876543210'
    });
    await customer.save();

    // Create order
    const order = new Order({
        orderNumber: 'ORD1001',
        customerId: customer._id,
        items: [
            { name: 'Item1', quantity: 2, price: 150 },
            { name: 'Item2', quantity: 1, price: 200 }
        ],
        totalAmount: 500
    });
    await order.save();
    console.log('Order Created:', order);

    // Read all orders
    const orders = await Order.find().populate('customerId');
    console.log('All Orders:', orders);

    // Update order
    await Order.updateOne({ orderNumber: 'ORD1001' }, { totalAmount: 550 });
    console.log('Order Updated');

    // Delete order
    // await Order.deleteOne({ orderNumber: 'ORD1001' });
    // console.log('Order Deleted');

    mongoose.connection.close();
}

run();

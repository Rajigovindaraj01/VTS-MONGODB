const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Order Schema
const orderSchema = new Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },

  items: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ],

  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Example usage
const newOrder = new Order({
  orderNumber: 'ORD123456',
  customerId: '60d5f484f8d3e04bd4fa1234', // sample customer ObjectId

  items: [
    { productId: '60d5f2a4a7b5e034c4a11234', quantity: 2 },
    { productId: '60d5f2c7a7b5e034c4a11235', quantity: 1 }
  ],

  totalAmount: 199.99
});

newOrder.save()
  .then(doc => console.log("Order saved:", doc))
  .catch(err => console.error("Error saving order:", err));

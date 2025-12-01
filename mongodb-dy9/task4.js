const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Child Schema (Referenced) ----
const ProductSchema = new Schema({
  title: String,
  price: Number
});
const Product = model("task4Product", ProductSchema);

// ---- 3) Parent Schema with ObjectId Reference ----
const OrderSchema = new Schema({
  customerName: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "task4Product"  // reference to Product
  }
});
const Order = model("task4Order", OrderSchema);

// ---- 4) Insert Documents ----
async function insertDocs() {
  try {
    // 4.1) Insert Product documents first
    const product1 = await Product.create({ title: "Bag", price: 499 });
    const product2 = await Product.create({ title: "Shoes", price: 999 });

    // 4.2) Insert Order documents referencing Product _id
    const order1 = await Order.create({ customerName: "Alice", product: product1._id });
    const order2 = await Order.create({ customerName: "Bob", product: product2._id });

    console.log("Inserted Orders with References:");
    console.log(order1);
    console.log(order2);

    // 4.3) Optional: Populate reference to see full product info
    const ordersPopulated = await Order.find().populate("product");
    console.log("Orders with populated products:", ordersPopulated);

  } catch (err) {
    console.log(err);
  }
}

insertDocs();

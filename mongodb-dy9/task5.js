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
const Product = model("task5Product", ProductSchema);

// ---- 3) Parent Schema with ObjectId Reference ----
const OrderSchema = new Schema({
  customerName: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "task5Product"   // reference to Product
  }
});
const Order = model("task5Order", OrderSchema);

// ---- 4) Insert Sample Documents ----
async function insertDocs() {
  const prod1 = await Product.create({ title: "Bag", price: 499 });
  const prod2 = await Product.create({ title: "Shoes", price: 999 });

  await Order.create({ customerName: "Alice", product: prod1._id });
  await Order.create({ customerName: "Bob", product: prod2._id });

  console.log("Sample data inserted.");
}

// ---- 5) Fetch with .populate() ----
async function fetchOrdersWithProducts() {
  // populate 'product' field to fetch referenced Product document
  const orders = await Order.find().populate("product");
  console.log("Orders with populated products:", orders);
}

// ---- 6) Run ----
async function run() {
  await insertDocs();
  await fetchOrdersWithProducts();
  mongoose.connection.close();
}

run();

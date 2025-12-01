const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Product Schema (Referenced) ----
const ProductSchema = new Schema({
  title: String,
  price: Number
});
const Product = model("task10product", ProductSchema);

// ---- 3) Order Schema referencing Product ----
const OrderSchema = new Schema({
  customerName: String,
  product: { type: Schema.Types.ObjectId, ref: "product" }
});
const Order = model("task10order", OrderSchema);

// ---- 4) Insert Sample Data ----
async function insertSampleData() {
  const prod1 = await Product.create({ title: "Bag", price: 499 });
  const order1 = await Order.create({ customerName: "Alice", product: prod1._id });
  return { prod1, order1 };
}

// ---- 5) Update Referenced Product ----
async function updateProduct(productId, newPrice) {
  await Product.updateOne({ _id: productId }, { $set: { price: newPrice } });

  // Fetch order with populated product
  const updatedOrder = await Order.findOne().populate("product");
  console.log("Updated Order with populated Product:", updatedOrder);
}

// ---- 6) Run Example ----
async function run() {
  const { prod1, order1 } = await insertSampleData();

  // Update Product price
  await updateProduct(prod1._id, 599);

  mongoose.connection.close();
}

run();

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Product Schema ----
const ProductSchema = new Schema({
  title: String,
  price: Number
});
const Product = model("task13product", ProductSchema);

// ---- 3) Order Schema referencing Product ----
const OrderSchema = new Schema({
  customerName: String,
  product: { type: Schema.Types.ObjectId, ref: "product" }
});
const Order = model("task13order", OrderSchema);

// ---- 4) Insert Sample Data ----
async function insertSampleData() {
  await Product.deleteMany({});
  await Order.deleteMany({});

  const prod1 = await Product.create({ title: "Bag", price: 499 });
  const prod2 = await Product.create({ title: "Shoes", price: 999 });
  const prod3 = await Product.create({ title: "Hat", price: 199 });

  await Order.create([
    { customerName: "Alice", product: prod1._id },
    { customerName: "Bob", product: prod2._id },
    { customerName: "Charlie", product: prod3._id },
    { customerName: "David", product: prod1._id }
  ]);
}

// ---- 5) Query Orders by Referenced Product Field ----
async function queryOrdersByProductPrice(minPrice) {
  const orders = await Order.find()
    .populate({
      path: "product",
      match: { price: { $gte: minPrice } } // filter products
    });

  // Remove orders where populate returned null (product didn't match)
  const filteredOrders = orders.filter(order => order.product != null);

  console.log(`Orders with product price >= ${minPrice}:`, filteredOrders);
}

// ---- 6) Run Example ----
async function run() {
  await insertSampleData();
  await queryOrdersByProductPrice(500); // e.g., products >= 500
  mongoose.connection.close();
}

run();

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

// Pre 'remove' middleware to handle cascade
ProductSchema.pre('remove', async function(next) {
  try {
    // Remove all orders that reference this product
    await Order.deleteMany({ product: this._id });
    console.log(`Deleted orders referencing product ${this._id}`);
    next();
  } catch (err) {
    next(err);
  }
});

const Product = model("product", ProductSchema);

// ---- 3) Order Schema referencing Product ----
const OrderSchema = new Schema({
  customerName: String,
  product: { type: Schema.Types.ObjectId, ref: "product" }
});
const Order = model("order", OrderSchema);

// ---- 4) Insert Sample Data ----
async function insertSampleData() {
  const prod1 = await Product.create({ title: "Bag", price: 499 });
  const prod2 = await Product.create({ title: "Shoes", price: 999 });

  await Order.create({ customerName: "Alice", product: prod1._id });
  await Order.create({ customerName: "Bob", product: prod1._id });
  await Order.create({ customerName: "Charlie", product: prod2._id });

  return { prod1, prod2 };
}

// ---- 5) Delete Product with cascade ----
async function deleteProductCascade(productId) {
  const product = await Product.findById(productId);
  if (!product) {
    console.log("Product not found");
    return;
  }

  // This triggers the pre 'remove' middleware
  await product.remove();

  // Check remaining orders
  const orders = await Order.find().populate("product");
  console.log("Remaining Orders after product deletion:", orders);
}

// ---- 6) Run Example ----
async function run() {
  const { prod1, prod2 } = await insertSampleData();

  // Delete first product and cascade delete orders
  await deleteProductCascade(prod1._id);

  mongoose.connection.close();
}

run();

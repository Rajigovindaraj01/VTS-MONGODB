// filename: productExample.js

const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/day6tasks')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. Create Product Schema & Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: String
});

const Product = mongoose.model('Product', productSchema);

// 3. Update product price by ID
async function updateProductPrice(productId, newPrice) {
  try {
    const updated = await Product.findByIdAndUpdate(
      productId,
      { $set: { price: newPrice } },
      { new: true, runValidators: true }
    );

    if (!updated) {
      console.log("No product found with this ID");
      return;
    }

    console.log("Product price updated:", updated);
  } catch (err) {
    console.error("Error updating product price:", err.message);
  }
}

// 4. Delete all out-of-stock products (stock = 0)
async function deleteOutOfStockProducts() {
  try {
    const deleted = await Product.deleteMany({ stock: 0 });

    console.log(`${deleted.deletedCount} out-of-stock products deleted.`);
  } catch (err) {
    console.error("Error deleting out-of-stock products:", err.message);
  }
}

// 5. Example usage
(async () => {
  try {
    // Create sample products
    const p1 = await Product.create({ name: "Laptop", price: 50000, stock: 10, category: "Electronics" });
    const p2 = await Product.create({ name: "Mouse", price: 500, stock: 0, category: "Electronics" });
    const p3 = await Product.create({ name: "Keyboard", price: 1200, stock: 0 });

    console.log("Created products:", p1, p2, p3);

    // Update price of laptop
    await updateProductPrice(p1._id, 55000);

    // Delete products that are out of stock
    await deleteOutOfStockProducts();

  } catch (err) {
    console.error("Unexpected error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
})();

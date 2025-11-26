// shop.js
const mongoose = require('mongoose');

// 1. Connect to MongoDB (NO OLD OPTIONS)
mongoose.connect('mongodb://localhost:27017/shop')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Connection Error:", err));

// 2. Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  inStock: Boolean
});

// 3. Model
const Product = mongoose.model('Product', productSchema);

// 4. Update product price by ID
async function updateProductPrice(id, newPrice) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price: newPrice },
      { new: true, runValidators: true }
    );
    console.log("Updated Product:", updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
  }
}

// 5. Delete all products out of stock
async function deleteOutOfStockProducts() {
  try {
    const result = await Product.deleteMany({ inStock: false });
    console.log("Deleted products count:", result.deletedCount);
  } catch (err) {
    console.error("Error deleting products:", err);
  }
}

// 6. Example usage
(async () => {
  const productId = "64a1eab1234567890abcdef2"; // replace with real ID

  await updateProductPrice(productId, 29.99);
  await deleteOutOfStockProducts();

  mongoose.connection.close();
})();

const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/day8-tasks');
    console.log("MongoDB Connected");

    // Define Product schema
    const productSchema = new mongoose.Schema({
      name: { type: String, required: true },
      price: { type: Number, required: true },
      isActive: { type: Boolean, default: true }
    });

    // Pre-find middleware: only find active products
    productSchema.pre(/^find/, function() {
      // 'this' refers to the query
      this.where({ isActive: true });
      console.log("Query filtered to only active products");
    });

    // Post-find middleware: log results
    productSchema.post(/^find/, function(docs) {
      console.log(`Query returned ${docs.length} document(s)`);
    });

    const Product = mongoose.model("task12Product", productSchema);

    // Seed some products
    await Product.deleteMany({}); // clean slate
    await Product.create([
      { name: "Laptop", price: 1000, isActive: true },
      { name: "Phone", price: 500, isActive: false },
      { name: "Tablet", price: 300, isActive: true }
    ]);

    // Query products (pre and post middleware will run)
    const products = await Product.find({});
    console.log("Products found:", products.map(p => p.name));

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

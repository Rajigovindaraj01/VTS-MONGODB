const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    description: String
});

// 1️⃣ Create multiple indexes
productSchema.index({ category: 1 });                  // Single-field index
productSchema.index({ price: -1 });                    // Single-field descending index
productSchema.index({ category: 1, price: -1 });       // Compound index
productSchema.index({ description: "text" });          // Text index

const Product = mongoose.model("task13-product", productSchema);

async function run() {

    // Clear collection
    await Product.deleteMany({});

    // Insert sample data
    const products = [
        { name: "Handbag", category: "Fashion", price: 1200, stock: 50, description: "Leather handbag" },
        { name: "Shoes", category: "Fashion", price: 1500, stock: 100, description: "Running shoes" },
        { name: "Laptop", category: "Electronics", price: 50000, stock: 20, description: "Gaming laptop" },
        { name: "Headphones", category: "Electronics", price: 2000, stock: 75, description: "Noise cancelling" },
        { name: "T-shirt", category: "Fashion", price: 800, stock: 200, description: "Cotton t-shirt" }
    ];
    await Product.insertMany(products);

    // 2️⃣ Evaluate query plan — filter by category
    const explain1 = await Product.find({ category: "Fashion" }).explain("executionStats");
    console.log("Query Plan for filter by category:");
    console.log(JSON.stringify(explain1.executionStats, null, 2));

    // 3️⃣ Evaluate query plan — filter by category + sort by price
    const explain2 = await Product.find({ category: "Fashion" }).sort({ price: -1 }).explain("executionStats");
    console.log("Query Plan for filter + sort by price:");
    console.log(JSON.stringify(explain2.executionStats, null, 2));

    // 4️⃣ Evaluate query plan — text search
    const explain3 = await Product.find({ $text: { $search: "Leather" } }).explain("executionStats");
    console.log("Query Plan for text search:");
    console.log(JSON.stringify(explain3.executionStats, null, 2));
}

run();

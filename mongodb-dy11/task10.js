const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number
});

// Compound index: filter by category and sort by price
productSchema.index({ category: 1, price: -1 });

const Product = mongoose.model("task10-product", productSchema);

async function run() {

    // Clear collection
    await Product.deleteMany({});

    // Insert sample data
    const products = [
        { name: "Handbag", category: "Fashion", price: 1200 },
        { name: "Shoes", category: "Fashion", price: 1500 },
        { name: "Laptop", category: "Electronics", price: 50000 },
        { name: "Headphones", category: "Electronics", price: 2000 },
        { name: "T-shirt", category: "Fashion", price: 800 },
    ];

    await Product.insertMany(products);

    // Query: filter by category and sort by price descending
    const result = await Product.find({ category: "Fashion" })
                                .sort({ price: -1 })
                                .explain("executionStats"); // Show index usage

    console.log("Query Result with Execution Stats:");
    console.log(result);
}

run();

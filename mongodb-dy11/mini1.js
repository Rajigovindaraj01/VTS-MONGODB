const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model("mini1product", productSchema);

async function run() {

    // Clear collection
    await Product.deleteMany({});

    // Insert sample data (10000 documents)
    const bulkData = [];
    for (let i = 0; i < 10000; i++) {
        bulkData.push({
            name: "Product" + i,
            category: i % 2 === 0 ? "Electronics" : "Fashion",
            price: Math.floor(Math.random() * 5000) + 100,
            stock: Math.floor(Math.random() * 100)
        });
    }
    await Product.insertMany(bulkData);
    console.log("Inserted 10000 products");

    // -----------------------
    // Query WITHOUT index
    // -----------------------
    console.time("Query without index");
    let result1 = await Product.find({ price: 3000 });
    console.timeEnd("Query without index");

    const explainWithoutIndex = await Product.find({ price: 3000 }).explain("executionStats");
    console.log("Explain without index:");
    console.log(explainWithoutIndex.executionStats);

    // -----------------------
    // Create single-field index on price
    // -----------------------
    await Product.collection.createIndex({ price: 1 });
    console.log("Index on price created");

    // Query WITH index
    console.time("Query with index");
    let result2 = await Product.find({ price: 3000 });
    console.timeEnd("Query with index");

    const explainWithIndex = await Product.find({ price: 3000 }).explain("executionStats");
    console.log("Explain with index:");
    console.log(explainWithIndex.executionStats);
}

run();

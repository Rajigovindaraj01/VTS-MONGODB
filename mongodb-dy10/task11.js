const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  quantitySold: Number
});

const Product = mongoose.model("task11Product", productSchema);

async function run() {
  // Insert sample data
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", category: "Electronics", price: 1000, quantitySold: 5 },
    { name: "Phone", category: "Electronics", price: 600, quantitySold: 10 },
    { name: "T-shirt", category: "Clothing", price: 20, quantitySold: 50 },
    { name: "Jeans", category: "Clothing", price: 40, quantitySold: 30 },
    { name: "Book", category: "Stationery", price: 15, quantitySold: 40 }
  ]);

  // Aggregation pipeline
  const report = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalSales: { $sum: { $multiply: ["$price", "$quantitySold"] } }, // total revenue
        totalUnits: { $sum: "$quantitySold" },                              // total units sold
        avgPrice: { $avg: "$price" }                                        // average price
      }
    },
    { $sort: { totalSales: -1 } },  // sort by total sales descending
    { $project: { 
        category: "$_id", 
        totalSales: 1, 
        totalUnits: 1, 
        avgPrice: 1, 
        _id: 0 
    }}
  ]);

  console.log("Sales Report per Category:", report);

  mongoose.connection.close();
}

run();

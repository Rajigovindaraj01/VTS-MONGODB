const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day10-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number
});

const Product = mongoose.model("mini1Product", productSchema);

async function run() {
  // Insert sample data
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", category: "Electronics", price: 1000 },
    { name: "Phone", category: "Electronics", price: 600 },
    { name: "T-shirt", category: "Clothing", price: 20 },
    { name: "Jeans", category: "Clothing", price: 40 },
    { name: "Book", category: "Stationery", price: 15 }
  ]);

  // Aggregation pipeline: group by category and calculate average price
  const avgPriceByCategory = await Product.aggregate([
    {
      $group: {
        _id: "$category",       // group by category
        avgPrice: { $avg: "$price" } // calculate average price
      }
    },
    { $project: { category: "$_id", avgPrice: 1, _id: 0 } } // reshape output
  ]);

  console.log("Average price by category:", avgPriceByCategory);

  mongoose.connection.close();
}

run();

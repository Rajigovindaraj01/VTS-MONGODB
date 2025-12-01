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

const Product = mongoose.model("task12Product", productSchema);

async function run() {
  // Insert sample data
  await Product.deleteMany({});
  await Product.insertMany([
    { name: "Laptop", category: "Electronics", price: 1000, quantitySold: 5 },
    { name: "Phone", category: "Electronics", price: 600, quantitySold: 10 },
    { name: "T-shirt", category: "Clothing", price: 20, quantitySold: 50 }
  ]);

  // Aggregation pipeline with $project
  const reshaped = await Product.aggregate([
    {
      $project: {
        _id: 0,                          // exclude _id
        productName: "$name",            // rename name to productName
        category: 1,                     // include category as is
        revenue: { $multiply: ["$price", "$quantitySold"] } // new field
      }
    }
  ]);

  console.log("Reshaped documents:", reshaped);

  mongoose.connection.close();
}

run();

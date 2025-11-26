const mongoose = require("mongoose");

// 1. Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongodb-day3")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("Connection Error:", err));

// 2. Create Product Schema
const mini1Schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  stock: { type: Number, default: 0 }
});

// 3. Create Model
const mini1data = mongoose.model("samplemini1", mini1Schema);

// 4. CRUD Operations
async function runCRUD() {
  try {
    // CREATE → Insert One Product
    const createRes = await mini1data.create({
      name: "Apple Juice",
      price: 120,
      category: "Beverages",
      stock: 50
    });
    console.log("Product Created:", createRes);

    // READ → Find Products
    const readRes = await mini1data.find();
    console.log("Products Found:", readRes);

    const updateRes = await mini1data.updateOne(
      { name: "Apple Juice" },
      { $set: { price: 150, stock: 60 } }
    );
    console.log("Update Result:", updateRes);
    const deleteRes = await mini1data.deleteOne({ name: "Apple Juice" });
    console.log("Delete Result:", deleteRes);

  } catch (err) {
    console.log("CRUD Error:", err.message);
  } finally {
    mongoose.connection.close();
    console.log("DB Closed");
  }
}

runCRUD();

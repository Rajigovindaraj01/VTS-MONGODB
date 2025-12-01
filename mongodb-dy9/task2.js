const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Child Schema (Referenced Model) ----
const ChildSchema = new Schema({
  title: String,
  price: Number
});

const Child = model("task2Child", ChildSchema);

// ---- 3) Parent Schema With ObjectId Reference ----
const ParentSchema = new Schema({
  name: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "task2Child"   // Reference to Child model
  }
});

const Parent = model("task2Parent", ParentSchema);

// ---- 4) Example Insert ----
async function createData() {
  // First create child document
  const child = await Child.create({
    title: "Bag",
    price: 499
  });

  // Use child._id as reference
  const parent = await Parent.create({
    name: "Order-1",
    product: child._id
  });

  console.log("Inserted Parent:", parent);
}

createData();

const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Subdocument Schema ----
const EmbeddingSchema = new Schema({
  vector: [Number],     // array of numbers
  label: String
});

// ---- 3) Main Schema with Subdocument Array ----
const ParentSchema = new Schema({
  name: String,
  embeddings: [EmbeddingSchema]    // embedded array
});

// ---- 4) Model ----
const Parent = model("task1Parent", ParentSchema);

// ---- 5) Example Insert ----
async function createData() {
  const doc = await Parent.create({
    name: "Document A",
    embeddings: [
      { vector: [0.1, 0.2, 0.3], label: "first" },
      { vector: [0.4, 0.5, 0.6], label: "second" }
    ]
  });

  console.log("Inserted:", doc);
}

createData();

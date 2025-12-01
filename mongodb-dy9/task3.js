const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// ---- 1) Connect to MongoDB ----
mongoose.connect("mongodb://localhost:27017/day9-tasks")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ---- 2) Subdocument Schema (Embedding) ----
const EmbeddingSchema = new Schema({
  vector: [Number],
  label: String
});

// ---- 3) Parent Schema with Embedded Array ----
const ParentSchema = new Schema({
  name: String,
  embeddings: [EmbeddingSchema]
});

const Parent = model("task3Parent", ParentSchema);

// ---- 4) Insert Documents With Embedded Subdocuments ----
async function insertDocs() {
  try {
    // Document 1
    const doc1 = await Parent.create({
      name: "User A",
      embeddings: [
        { vector: [1, 2, 3], label: "first" },
        { vector: [4, 5, 6], label: "second" }
      ]
    });

    // Document 2
    const doc2 = await Parent.create({
      name: "User B",
      embeddings: [
        { vector: [10, 20, 30], label: "alpha" }
      ]
    });

    console.log("Inserted Document 1:", doc1);
    console.log("Inserted Document 2:", doc2);

  } catch (err) {
    console.log(err);
  }
}

insertDocs();

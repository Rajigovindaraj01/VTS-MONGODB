const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mongodb-day3");
    console.log("DB Connected Successfully");
  } catch (err) {
    console.error("DB Connection Error:", err.message);
  }
}

const task13Schema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 1 },
  city: String
});

const Task13 = mongoose.model("task13data", task13Schema)
async function run() {
  try {
    const inserted = await Task13.create({
      name: "Raji",
      age: 23,
      city: "Thanjavur"
    });
    console.log("Document Inserted:", inserted);
    const result = await Task13.find({ city: "Thanjavur" });
    console.log("Documents Found:", result);
    const updated = await Task13.updateOne(
      { name: "Raji" },
      { $set: { city: "Coimbatore" } }
    );
    console.log("Update Result:", updated);
    const deleted = await Task13.deleteOne({ name: "Raji" });
    console.log("Delete Result:", deleted);

  } catch (err) {
    console.error("CRUD Operation Error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("DB Connection Closed");
  }
}

connectDB();
run();

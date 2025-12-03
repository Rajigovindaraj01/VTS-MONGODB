const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/day11tasks")
.then(() => console.log("MONGODB CONNECTED"))
.catch(err => console.log(err));

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number
});

// 📌 Create a TEXT INDEX on description field
productSchema.index({ description: "text" });

const Product = mongoose.model("task4-product", productSchema);

async function run() {

    // Insert sample data
    await Product.create({
        title: "Handbag",
        description: "Beautiful leather handbag for women",
        price: 1200
    });

    await Product.create({
        title: "Shoes",
        description: "Comfortable running shoes for daily use",
        price: 1500
    });

    // 📌 TEXT SEARCH → find documents that contain the word "leather"
    const result = await Product.find({ 
        $text: { 
            $search: "leather"
        } 
    });

    console.log(result);
}

run();

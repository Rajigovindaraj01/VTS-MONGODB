const mongoose = require('mongoose');

(async () => {
  try {
    // 1) Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/day7-tasks');
    console.log("MongoDB Connected");

    // 2) Define Product schema
    const productSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Product name is required"]
      },
      price: {
        type: Number,
        required: [true, "Price is required"],
        validate: {
          validator: function(value) {
            return value > 0; // custom validation: price must be positive
          },
          message: "Price must be a positive number"
        }
      },
      stock: {
        type: Number,
        default: 10 // default stock quantity
      }
    });

    // 3) Create Product model
    const Product = mongoose.model("mini2Product", productSchema);

    // 4) Attempt to insert invalid data
    const invalidProduct = {
      name: "Sample Product",
      price: -50 // invalid price
      // stock will use default
    };

    try {
      const product = await Product.create(invalidProduct);
      console.log("Product Created:", product);
    } catch (err) {
      if (err.name === "ValidationError") {
        console.log("Validation Errors:");
        Object.values(err.errors).forEach(error => {
          console.log(`Field: ${error.path}, Message: ${error.message}`);
        });
      } else {
        console.error("Other error:", err);
      }
    }

  } catch (err) {
    console.error("Connection Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();

const mongoose = require('mongoose');

// FIX: Remove old options (Mongoose 9 no longer supports them)
mongoose.connect('mongodb://localhost:27017/day7-tasks')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Connection Error:", err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: v => v >= 0,
            message: props => `${props.value} is not a valid price! Price must be positive.`
        }
    },
    stock: { type: Number, default: 0 }
});

const Product = mongoose.model('samplemini2-Product', productSchema);

async function run() {
    try {
        // Valid product
        let product = new Product({ name: 'Phone', price: 699 });
        await product.save();
        console.log('Product saved:', product);

        // Invalid product (negative price)
        product = new Product({ name: 'Laptop', price: -1500 });
        await product.save();

    } catch (error) {
        console.error('Validation Error:', error.message);
    } finally {
        mongoose.connection.close();
    }
}

run();

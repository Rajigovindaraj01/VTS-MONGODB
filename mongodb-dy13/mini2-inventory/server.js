require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
app.use(express.json());

// connect database
connectDB();

// Routes
app.use("/api", itemRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

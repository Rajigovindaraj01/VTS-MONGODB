const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(bodyParser.json());

// Connect DB
connectDB();

// Import Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// Start server
const PORT = process.env.PORT || 3007;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

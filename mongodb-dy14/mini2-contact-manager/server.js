const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Routes
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contacts", contactRoutes);

// Start server
const PORT = process.env.PORT || 3008;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

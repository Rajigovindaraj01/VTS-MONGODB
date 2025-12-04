const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// DB Connect
connectDB();

// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Server start
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

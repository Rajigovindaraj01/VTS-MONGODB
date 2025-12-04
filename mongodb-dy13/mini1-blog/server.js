require("dotenv").config();
const express = require("express");
const sequelize = require("./models/index");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

app.use("/api", blogRoutes);

sequelize.sync(); // Create tables automatically

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

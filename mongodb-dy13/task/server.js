require ("dotenv").config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());

connectDB();

app.use('/api/books',require("./routes/bookroutes"));

app.listen(process.env.PORT, () =>{
    console.log("server running on port", process.env.PORT);
})
//task2

const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api',userRoutes);
app.use('/api',productRoutes);

const server = http.createServer(app);

server.listen(3000, ()=>{
    console.log("Server running on port http://localhost:3000")
})
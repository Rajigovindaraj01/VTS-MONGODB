const express = require('express');
const connectDB = require('./config/db');
const http = require('http');
const bookRoutes = require('./routes/bookRoutes')
const app = express();
connectDB();

app.use(express.json());

app.use('/api',bookRoutes);

const server = http.createServer(app);

server.listen(3004, ()=>{
    console.log("Server running on http://localhost:3004")
})
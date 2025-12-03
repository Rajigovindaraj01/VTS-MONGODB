const express = require('express');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const http = require('http');

const app = express();
connectDB();
app.use(express.json());
app.use('/api',contactRoutes);

const server = http.createServer(app);

server.listen(3002,()=>{
    console.log('server is running on port http://localhost:3002')
})
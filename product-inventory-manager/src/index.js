// This file is Express API Entry Point:
// - Sets up Express app
// - Adds CORS Middleware
// - Mounts product routes
// - Exports Lambda handler
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

//Middleware
app.use(cors()); //Enable CORS
app.use(express.json()); //Parse JSON

//Health Check Endpoint
app.get('/', (req,res) => {
    res.json({
        message: 'Product Inventory API',
        version: '1.0.0',
        status: healthy,
        endpoints: {
            products: '/products',
            health: '/'
        }
    });
});

//Routes
app.use('/products', productsRouter);
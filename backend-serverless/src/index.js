// This file is Express API Entry Point:
// - Sets up Express app
// - Adds CORS Middleware
// - Mounts product routes
// - Exports Lambda handler
const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const serverless = require('serverless-http');

const app = express();

//Middleware
app.use(cors()); //Enable CORS
app.use(express.json()); //Parse JSON

//Health Check Endpoint
app.get('/', (req,res) => {
    res.json({
        message: 'Product Inventory API',
        version: '1.0.0',
        status: 'healthy',
        endpoints: {
            products: '/products',
            health: '/'
        }
    });
});

//Routes
app.use('/products', productsRouter);

//404 Handler
app.use(
    (req, res) => {
        res.status(404).json({
            error: 'Not Found',
            message: `Cannot ${req.method} ${req.path}`
        });
    }
);

//Error handler
app.use(
    (err, req, res, next) => {
        console.error('Error: ', err);
        res.status(err.statusCode || 500).json({
            error: err.message || 'Internal Server Error',
            details: process.env.STAGE === 'dev' ? err.stack : undefined
        });

    }
);

//Export handler for Lambda (A Translator that converts between Express and Lambda)
module.exports.handler = serverless(app);
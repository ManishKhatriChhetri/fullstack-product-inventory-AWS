const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/', productsController.listProducts);
router.post('/', productsController.createProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProductById);

module.exports = router;
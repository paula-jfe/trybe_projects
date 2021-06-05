const express = require('express');
const validateToken = require('../middlewares/validateToken');
const { getAllProducts, getProductById } = require('../controllers/products');

const router = express.Router();

router.route('/products')
  .get(validateToken, getAllProducts);

router.route('/products/:id')
  .get(getProductById);

module.exports = router;

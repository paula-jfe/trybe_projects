const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/checkout',
middlewares.validateToken,
checkoutController.createSale);

module.exports = router;

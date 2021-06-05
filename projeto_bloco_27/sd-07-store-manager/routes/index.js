const express = require('express');

const { checkName, checkNameLength, checkQuantity } =
  require('../middlewares/productsMiddleware');

const { checkProductId, checkProductQuantity } =
  require('../middlewares/salesMiddleware');

const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();
const addProductMiddlewares = [checkName, checkNameLength, checkQuantity];
const updateProductMiddlewares = [checkNameLength, checkQuantity];
const addSaleMiddlewares = [checkProductId, checkProductQuantity ];

router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findById);
router.post('/products', addProductMiddlewares, productsController.addProduct);
router.put('/products/:id', updateProductMiddlewares, productsController.updateOne);
router.delete('/products/:id', productsController.deleteOne);

router.get('/sales', salesController.findAll);
router.get('/sales/:id', salesController.findById);
router.post('/sales', addSaleMiddlewares, salesController.addSale);
router.put('/sales/:id', checkProductQuantity, salesController.updateOne);
router.delete('/sales/:id', salesController.deleteOne);

module.exports = router;

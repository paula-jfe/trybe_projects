const express = require('express');
const adminOrdersController = require('../controllers/adminOrdersController');

const router = express.Router();

router.get('/admin/orders',
adminOrdersController.getAllOrders);

router.get('/admin/orders/:id',
adminOrdersController.getOrderById);

router.put('/admin/orders/:id',
adminOrdersController.updateOrderByStatus);

module.exports = router;

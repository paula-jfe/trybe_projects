const adminOrdersModel = require('../models/adminOrdersModel');

const getAllOrders = async () => {
  const orders = await adminOrdersModel.getAllOrders();
  return orders;
};

const getOrderById = async (id) => {
  const response = await adminOrdersModel.getOrderById(id);
  return response;
};

const updateOrderByStatus = async (id, status) => {
  await adminOrdersModel.updateOrderByStatus(id, status);
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderByStatus,
};

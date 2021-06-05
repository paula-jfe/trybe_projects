const ordersModel = require('../models/ordersModel');

const getOrdersByUser = async (userId) => {
  const orders = await ordersModel.getOrdersByUser(userId);
  return orders;
};

const getOrderById = async (id) => {
  const response = await ordersModel.getOrderById(id);
  return response;
};
module.exports = {
  getOrdersByUser,
  getOrderById,
};

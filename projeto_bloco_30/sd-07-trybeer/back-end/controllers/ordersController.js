const ordersService = require('../services/ordersService');
const httpStatus = require('./httpStatus');

const getOrdersByUser = async (req, res) => {
const errorMessage = { message: 'Usuário sem pedidos' };
  try {
    const { id: userId } = req.user;
    const orders = await ordersService.getOrdersByUser(userId);

  res.status(httpStatus.OK).json(orders);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

const getOrderById = async (req, res) => {
  const errorMessage = { message: 'Pedido não cadastrado' };
    try {
      const { id } = req.params;
      const response = await ordersService.getOrderById(id);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(errorMessage);
  }
  };

module.exports = {
  getOrdersByUser,
  getOrderById,
};

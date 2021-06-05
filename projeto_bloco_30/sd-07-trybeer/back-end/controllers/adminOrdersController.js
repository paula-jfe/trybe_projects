const adminOrdersService = require('../services/adminOrdersService');
const httpStatus = require('./httpStatus');

const getAllOrders = async (req, res) => {
const errorMessage = { message: 'Não existem pedidos cadastrados' };
  try {
    const orders = await adminOrdersService.getAllOrders();

  res.status(httpStatus.OK).json(orders);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

const getOrderById = async (req, res) => {
  const errorMessage = { message: 'Pedido não cadastrado' };
    try {
      const { id } = req.params;
      const response = await adminOrdersService.getOrderById(id);
    res.status(httpStatus.OK).json(response);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json(errorMessage);
  }
  };

  const updateOrderByStatus = async (req, res) => {
    const { id } = req.params;
    const status = 'Entregue';

    const okMessage = { message: 'Status alterado com sucesso' };
    const errorMessage = { message: 'Pedido não cadastrado' };
      try {
        await adminOrdersService.updateOrderByStatus(id, status);
      res.status(httpStatus.OK).json(okMessage);
    } catch (error) {
      res.status(httpStatus.BAD_REQUEST).json(errorMessage);
    }
    };

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderByStatus,
};

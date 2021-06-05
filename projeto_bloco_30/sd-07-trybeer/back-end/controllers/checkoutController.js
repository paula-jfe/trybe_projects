const checkoutService = require('../services/checkoutService');
const httpStatus = require('./httpStatus');

const createSale = async (req, res) => {
const sucessMessage = { message: 'pedido cadastrado com sucesso' };
const errorMessage = { message: 'erro ao cadastrar pedido' };
  try {
    const { 
      deliveryAddress: dAddress, 
      deliveryNumber: dNumber,
      salesProducts,
    } = req.body;

    const { id: userId } = req.user;
      await checkoutService.createSale(userId, dAddress, dNumber, salesProducts);

  res.status(httpStatus.CREATED).json(sucessMessage);
} catch (error) {
  res.status(httpStatus.BAD_REQUEST).json(errorMessage);
}
};

module.exports = {
  createSale,
};

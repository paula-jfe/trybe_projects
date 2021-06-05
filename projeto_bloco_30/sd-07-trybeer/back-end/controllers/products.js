const httpStatus = require('./httpStatus');
const { getAllProductsService, getProductByIdService } = require('../services/products');

const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsService();
    res.status(httpStatus.OK).json(products);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    res.status(httpStatus.OK).json(product);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
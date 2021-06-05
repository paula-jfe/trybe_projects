const productsModel = require('../models/productsModel');

const REQUEST_CREATED = 201;
const REQUEST_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;

const addProduct = async (request, response) => {
  try {
    const { name, quantity } = request.body;
    const results = await productsModel.addNewProduct(name, quantity);
    response.status(REQUEST_CREATED).json(results);
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_request, response) => {
  try {
    const results = await productsModel.findAllProducts();
    response.status(REQUEST_OK).json({ products: results });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findById = async (request, response) => {
  try {
    const { id } = request.params;
    const results = await productsModel.findProductById(id);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

const updateOne = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, quantity } = request.body;
    const results = await productsModel.updateProduct(id, name, quantity);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

const deleteOne = async (request, response) => {
  try {
    const { id } = request.params;
    const results = await productsModel.deleteProduct(id);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      }
    });
  }
};

module.exports = {
  addProduct,
  findAll,
  findById,
  updateOne,
  deleteOne,
};

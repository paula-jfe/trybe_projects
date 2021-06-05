const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');

const REQUEST_OK = 200;
const INTERNAL_SERVER_ERROR = 500;
const UNPROCESSABLE_ENTITY = 422;
const NOT_FOUND = 404;

const addSale = async (request, response) => {
  try {
    const sale = request.body;
    const results = await salesModel.addNewSale(sale);
    await salesService.updateStock(sale);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findAll = async (_request, response) => {
  try {
    const results = await salesModel.findAllSales();
    response.status(REQUEST_OK).json({ sales: results });
  } catch (error) {
    response.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findById = async (request, response) => {
  const { id } = request.params;
  const results = await salesModel.findSaleById(id);
  if (results) {
    return response.status(REQUEST_OK).json(results);
  }
  return response.status(NOT_FOUND).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    }
  });
};

const updateOne = async (request, response) => {
  try {
    const { id } = request.params;
    const sale = request.body;
    const results = await salesModel.updateSale(id, sale);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      }
    });
  }
};

const deleteOne = async (request, response) => {
  try {
    const { id } = request.params;
    await salesService.restoreStock(id);
    const results = await salesModel.deleteSale(id);
    response.status(REQUEST_OK).json(results);
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    });
  }
};

module.exports = {
  addSale,
  findAll,
  findById,
  updateOne,
  deleteOne,
};

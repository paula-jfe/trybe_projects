const productsModel = require('../models/productsModel');
const UNPROCESSABLE_ENTITY = 422;
const MIN_LENGTH = 5;
const EMPTY = 0;

const checkName = async (request, response, next) => {
  const { name } = request.body;
  if (!name) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'name is required',
      }
    });
  }
  if (await productsModel.findProduct(name)) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      }
    });
  };
  next();
};

const checkNameLength = (request, response, next) => {
  const { name } = request.body;
  if (name.length < MIN_LENGTH) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      }
    });
  }
  next();
};

const checkQuantity = (request, response, next) => {
  const { quantity } = request.body;
  if (quantity === undefined || quantity === null) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'quantity is required',
      }
    });
  }
  if (typeof quantity === 'string') {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      }
    });
  }
  if (quantity <= EMPTY) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      }
    });
  }
  next();
};

module.exports = {
  checkName,
  checkNameLength,
  checkQuantity,
};

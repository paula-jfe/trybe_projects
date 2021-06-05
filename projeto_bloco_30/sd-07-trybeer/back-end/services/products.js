const { getAllProducts, getProductById } = require('../models/products');

const getAllProductsService = async () => {
  const products = await getAllProducts();

  if (!products) {
    throw new Error('Não há produtos');
  }

  return products;
};

const getProductByIdService = async (id) => {
  const product = await getProductById(id);

  if (!product) {
    throw new Error('Não há produto com esse Id');
  }

  return product;
};

module.exports = {
  getAllProductsService,
  getProductByIdService,
};

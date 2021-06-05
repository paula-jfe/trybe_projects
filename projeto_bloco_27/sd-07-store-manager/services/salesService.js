const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const EMPTY = 0;

const updateStock = async (sale) => {
  for (const product of sale) {
    const { productId, quantity } = product;
    const saleProduct = await productsModel.findProductById(productId);
    const newQuantity = saleProduct.quantity - quantity;
    if (newQuantity >= EMPTY) {
      await productsModel.updateProduct(productId, saleProduct.name, newQuantity);
    }
  }
};

const restoreStock = async (id) => {
  const sale = await salesModel.findSaleById(id);

  if (sale) {
    for (const product of sale.itensSold) {
      const { productId, quantity } = product;
      const saleProduct = await productsModel.findProductById(productId);
      const newQuantity = saleProduct.quantity + quantity;
      await productsModel.updateProduct(productId, saleProduct.name, newQuantity);
    }
  }
};

module.exports = {
  updateStock,
  restoreStock,
};

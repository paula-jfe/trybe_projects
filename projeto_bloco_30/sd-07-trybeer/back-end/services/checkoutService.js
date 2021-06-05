const checkoutModel = require('../models/checkoutModel');

const createSale = async (userId, dAddress, dNumber, salesProducts) => { 
  const saleDate = new Date();
  const status = 'Pendente';
  
  const totalPrice = await salesProducts.reduce(async (acc, item) => {
    const productId = parseInt(item.productId, 10);
    const productQuantity = parseInt(item.quantity, 10);
    const productUnityPrice = await checkoutModel.productPrice(productId);
    const productTotalPrice = productUnityPrice * productQuantity;
    return await acc + productTotalPrice;
  }, 0);

  const data = { userId, totalPrice, dAddress, dNumber, saleDate, status, salesProducts };

  await checkoutModel.createSale(data);
};

module.exports = {
  createSale,
};

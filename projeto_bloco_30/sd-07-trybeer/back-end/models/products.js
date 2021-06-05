const connect = require('../configuration/configuration');

const getAllProducts = async () => {
  console.log('entrei no model');
  const [products] = await connect.execute('SELECT * FROM products');
  return products;
};

const getProductById = async (id) => {
  const [product] = await connect.execute(
    'SELECT * FROM WHERE id = ?',
    [id],
  );
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
};
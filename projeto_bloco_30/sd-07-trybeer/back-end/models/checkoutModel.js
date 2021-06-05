const connect = require('../configuration/configuration');

const createSale = async (data) => {
  const { userId, totalPrice, dAddress, dNumber, saleDate, status, salesProducts,
  } = data;

  const values = [userId, totalPrice, dAddress, dNumber, saleDate, status];
  const [sales] = await connect.execute(
    `INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)
    VALUES(?, ?, ?, ?, ?, ?)`, values,
  );

  const insertSalesProducts = [];
  salesProducts.forEach((item) => { 
    insertSalesProducts.push([sales.insertId, item.productId, item.quantity]);
  });
  insertSalesProducts.forEach(async (item) => {
    await connect.execute(
  'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', item,
  );
  });
};

const productPrice = async (productId) => {
  const [[{ price }]] = await connect.execute(
    'SELECT price FROM products WHERE id = ?', [productId],
  );
  return price;
};

module.exports = {
  createSale,
  productPrice,
};

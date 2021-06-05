const connect = require('../configuration/configuration');

const getOrdersByUser = async (userId) => {
  const [orders] = await connect.execute(
    'SELECT * FROM sales WHERE user_id = ? ORDER BY id ASC', [userId],
  );
  return orders;
};

const getOrderById = async (id) => {
  const [products] = await connect.execute(
    'SELECT quantity, name, '
    + 'FORMAT((quantity * price), 2) AS productPrice FROM sales AS s '
    + 'INNER JOIN sales_products AS sp ON s.id = sp.sale_id '
    + 'INNER JOIN products AS p ON sp.product_id = p.id WHERE s.id = ?',
    [id],
  );

  const [[order]] = await connect.execute(
    'SELECT total_price, sale_date FROM sales WHERE id = ?', [id],
  );

  const response = { 
  totalPrice: order.total_price,
  saleDate: order.sale_date,
  productList: [...products],
};

  return response;
};

module.exports = {
  getOrdersByUser,
  getOrderById,
};

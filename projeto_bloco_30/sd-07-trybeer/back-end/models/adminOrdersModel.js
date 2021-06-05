const connect = require('../configuration/configuration');

const getAllOrders = async () => {
  const [orders] = await connect.execute(
    'SELECT * FROM sales ORDER BY id ASC',
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
    'SELECT total_price, status FROM sales WHERE id = ?', [id],
  );

  const response = { 
  totalPrice: order.total_price,
  status: order.status,
  ProductList: [...products],
};

  return response;
};

const updateOrderByStatus = async (id, status) => connect.execute(
    'UPDATE sales SET status = ? WHERE id = ?',
    [status, id],
);

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderByStatus,
};

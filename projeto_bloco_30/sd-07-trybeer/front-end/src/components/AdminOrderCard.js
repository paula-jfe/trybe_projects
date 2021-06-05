import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function OrderCard({ order, pos }) {
  const { id, deliveryAddress, totalPrice, status } = order;

  return (
    <Link to={ `/admin/orders/${id}` }>
      <span data-testid={ `${pos}-order-number` }>{ `Pedido ${id}` }</span>
      <span data-testid={ `${pos}-order-address` }>{ deliveryAddress }</span>
      <span data-testid={ `${pos}-order-total-value` }>{ totalPrice }</span>
      <span data-testid={ `${pos}-order-status` }>{ status }</span>
    </Link>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  pos: PropTypes.objectOf.isRequired,
};

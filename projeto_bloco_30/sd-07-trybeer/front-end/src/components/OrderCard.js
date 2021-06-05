import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function OrderCard({ order, position }) {
  const check = moment(order.sale_date, 'YYYY/MM/DD').format('DD/MM');

  return (
    <div data-testid={ `${position}-order-card-container` }>
      <Link to={ `/orders/${order.id}` }>
        <span data-testid={ `${position}-order-number` }>{ `Pedido ${order.id}` }</span>
        <span data-testid={ `${position}-order-date` }>
          { check }
        </span>
        <span data-testid={ `${position}-order-total-value` }>
          { `R$ ${new Intl.NumberFormat('pt-br',
            { style: 'currency', currency: 'BRL' }).format(order.total_price)}` }
        </span>
      </Link>
    </div>
  );
}

OrderCard.propTypes = {
  order: PropTypes.objectOf.isRequired,
  position: PropTypes.objectOf.isRequired,
};

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import { fetchOrder } from '../actions';

export default function OrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const orderSelected = useSelector(({ order }) => order);
  const user = JSON.parse(localStorage.getItem('user'));
  const check = moment(orderSelected.saleDate, 'YYYY/MM/DD').format('DD/MM');

  const [shouldRedirect, setShouldRedirect] = useState('');
  const ROUNDING_OPTION = 2;

  useEffect(() => {
    if (!user || orderSelected.error) {
      setShouldRedirect('/login');
    } else {
      dispatch(fetchOrder(params.id, user.token));
    }
  }, []);

  return (
    <>
      <Header title="Detalhes de Pedido" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <h1 data-testid="order-number">{ `Pedido ${orderSelected.id}` }</h1>
      <span data-testid="order-date">
        { check }
      </span>
      <table>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Nome</th>
            <th>Valor Total do Produto</th>
            <th>Valor Total do Pedido</th>
          </tr>
        </thead>
        <tbody>
          { orderSelected.products.map((product, index) => (
            <tr key={ index }>
              <td data-testid={ `${index}-product-qtd` }>{ product.quantity }</td>
              <td data-testid={ `${index}-product-name` }>{ product.name }</td>
              <td data-testid={ `${index}-product-total-value` }>
                { `R$ ${product.totalPrice.toFixed(ROUNDING_OPTION)}` }
              </td>
            </tr>
          )) }
          <tr>
            <td data-testid="order-total-value">
              { `R$ ${orderSelected.totalPrice}` }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

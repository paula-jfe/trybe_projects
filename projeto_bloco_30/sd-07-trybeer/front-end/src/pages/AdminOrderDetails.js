import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import useForceUpdate from 'use-force-update';
import AdminSidebar from '../components/AdminSidebar';
import { fetchAdminOrder } from '../actions';
import { updateOrder } from '../services/apiServices';

export default function AdminOrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const orderSelected = useSelector(({ adminOrder }) => adminOrder);
  const { order, isLoading } = orderSelected;
  const ROUNDING_OPTION = 2;
  // const forceUpdate = useForceUpdate();

  useEffect(() => {
    dispatch(fetchAdminOrder(params.id));
  }, [dispatch, params.id]);

  const handleClick = async (id, status) => {
    await updateOrder(id, status);
    // forceUpdate();
  };

  return (
    <>
      <span data-testid="order-number">{ params.id }</span>
      <span data-testid="order-status">{ order.status }</span>
      <AdminSidebar />
      { orderSelected.status === 'pending'
        && (
          <button
            data-testid="mark-as-delivered-btn"
            onClick={ () => handleClick(params.id, 'delivered') }
            type="button"
          >
            Marcar pedido como entregue
          </button>
        ) }
      { isLoading === true ? 'Carregando...'
        : (
          <table>
            <thead>
              <tr>
                <th>Quantidade</th>
                <th>Nome do Produto</th>
                <th>Valor Unitário do Produto</th>
                <th>Valor Total do Produto</th>
              </tr>
            </thead>
            <tbody>
              { orderSelected.products.map((product, index) => (
                <tr key={ index }>
                  <td data-testid={ `${index}-product-qtd` }>{ product.quantity }</td>
                  <td data-testid={ `${index}-product-name` }>{ product.name }</td>
                  <td data-testid={ `${index}-order-unit-price` }>{ product.price }</td>
                  <td data-testid={ `${index}-order-total-value` }>
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
        ) }
    </>
  );
}

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../actions';
import AdminSidebar from '../components/AdminSidebar';
import AdminOrderCard from '../components/OrderCard';

export default function AdminOrders() {
  const ordersList = useSelector(({ adminOrders }) => adminOrders);
  const { isLoading, orders } = ordersList;
  const sortedOrders = orders.sort((a, b) => a.id - b.id);
  const deliveredOrders = sortedOrders.filter((order) => order.status === 'Entregue');
  const pendingOrders = sortedOrders.filter((order) => order.status === 'Pendente');
  console.log(ordersList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  return (
    <>
      <h1>Pedidos Pendentes</h1>
      <AdminSidebar />
      { isLoading === true ? 'Carregando...'
        : (
          <div>
            <label htmlFor="AdminOrderCard">
              Pendentes
              { pendingOrders
                .map((item, i) => <AdminOrderCard key={ i } order={ item } pos={ i } />) }
            </label>
            <label htmlFor="AdminOrderCard">
              Entregue
              { deliveredOrders
                .map((item, i) => <AdminOrderCard key={ i } order={ item } pos={ i } />) }
            </label>
          </div>
        ) }
    </>
  );
}

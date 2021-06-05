import getProducts from '../services/products';
import { getOrders, getOrder, getAdminOrders, getAdminOrder } from '../services/order';

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS';
export const REQUEST_PRODUCTS_FAIL = 'REQUEST_PRODUCTS_FAIL';
export const SAVE_ORDER = 'SAVE_ORDER';
export const REQUEST_ORDER = 'REQUEST_ORDER';
export const REQUEST_ORDER_SUCCESS = 'REQUEST_ORDER_SUCCESS';
export const REQUEST_ORDER_FAIL = 'REQUEST_ORDER_FAIL';
export const REQUEST_ORDERS = 'REQUEST_ORDERS';
export const REQUEST_ORDERS_SUCCESS = 'REQUEST_ORDERS_SUCCESS';
export const REQUEST_ORDERS_FAIL = 'REQUEST_ORDERS_FAIL';
export const REQUEST_ADMIN_ORDERS = 'REQUEST_ADMIN_ORDERS';
export const REQUEST_ADMIN_ORDERS_SUCCESS = 'REQUEST_ADMIN_ORDERS_SUCCESS';
export const REQUEST_ADMIN_ORDERS_FAIL = 'REQUEST_ADMIN_ORDERS_FAIL';
export const REQUEST_ADMIN_ORDER = 'REQUEST_ADMIN_ORDER';
export const REQUEST_ADMIN_ORDER_SUCCESS = 'REQUEST_ADMIN_ORDER_SUCCESS';
export const REQUEST_ADMIN_ORDER_FAIL = 'REQUEST_ADMIN_ORDER_FAIL';

export const update = (cart) => ({
  type: UPDATE_QUANTITY,
  cart,
});

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const requestProductsSuccess = (products) => ({
  type: REQUEST_PRODUCTS_SUCCESS,
  products,
});

export const requestProductsFail = (error) => ({
  type: REQUEST_PRODUCTS_FAIL,
  error,
});

export const finish = (message) => ({
  type: SAVE_ORDER,
  message,
});

export const requestOrders = () => ({
  type: REQUEST_ORDERS,
});

export const requestOrdersSuccess = (orders) => ({
  type: REQUEST_ORDERS_SUCCESS,
  orders,
});

export const requestOrdersFail = (error) => ({
  type: REQUEST_ORDERS_FAIL,
  error,
});

export const requestOrder = () => ({
  type: REQUEST_ORDER,
});

export const requestOrderSuccess = (order) => ({
  type: REQUEST_ORDER_SUCCESS,
  order,
});

export const requestOrderFail = (error) => ({
  type: REQUEST_ORDER_FAIL,
  error,
});

export const requestAdminOrders = () => ({
  type: REQUEST_ADMIN_ORDERS,
});

export const requestAdminOrdersSuccess = (orders) => ({
  type: REQUEST_ADMIN_ORDERS_SUCCESS,
  orders,
});

export const requestAdminOrdersFail = (error) => ({
  type: REQUEST_ADMIN_ORDERS_FAIL,
  error,
});

export const requestAdminOrder = () => ({
  type: REQUEST_ADMIN_ORDER,
});

export const requestAdminOrderSuccess = (orders) => ({
  type: REQUEST_ADMIN_ORDER_SUCCESS,
  orders,
});

export const requestAdminOrderFail = (error) => ({
  type: REQUEST_ADMIN_ORDER_FAIL,
  error,
});

export function fetchProducts(token) {
  console.log('busquei produtos');
  return async (dispatch) => {
    try {
      dispatch(requestProducts());
      const products = await getProducts(token);
      console.log('peguei', products);
      dispatch(requestProductsSuccess(products));
    } catch (error) {
      dispatch(requestProductsFail(error.message));
    }
  };
}

export function fetchOrders(token) {
  return async (dispatch) => {
    try {
      dispatch(requestOrders());
      const orders = await getOrders(token);
      console.log('peguei', orders);
      dispatch(requestOrdersSuccess(orders));
    } catch (error) {
      dispatch(requestOrdersFail(error.message));
    }
  };
}

export function fetchOrder(id, token) {
  return async (dispatch) => {
    try {
      dispatch(requestOrder());
      const order = await getOrder(id, token);
      dispatch(requestOrderSuccess(order));
    } catch (error) {
      dispatch(requestOrderFail(error.message));
    }
  };
}

export function fetchAdminOrders() {
  return async (dispatch) => {
    try {
      dispatch(requestAdminOrders());
      const orders = await getAdminOrders();
      dispatch(requestAdminOrdersSuccess(orders));
    } catch (error) {
      dispatch(requestAdminOrdersFail(error.message));
    }
  };
}

export function fetchAdminOrder(id) {
  return async (dispatch) => {
    try {
      dispatch(requestAdminOrder());
      const order = await getAdminOrder(id);
      dispatch(requestAdminOrderSuccess(order));
    } catch (error) {
      dispatch(requestAdminOrderFail(error.message));
    }
  };
}

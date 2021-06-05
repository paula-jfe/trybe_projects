import { combineReducers } from 'redux';
import products from './products';
import order from './order';
import cart from './cart';
import orders from './orders';
import adminOrder from './adminOrder';
import adminOrders from './adminOrders';

const rootReducer = combineReducers({
  products,
  order,
  cart,
  orders,
  adminOrder,
  adminOrders,
});

export default rootReducer;

import {
  REQUEST_ORDERS,
  REQUEST_ORDERS_SUCCESS,
  REQUEST_ORDERS_FAIL,
} from '../actions';

const INITIAL_STATE = {
  orders: [],
  isLoading: false,
  error: '',
};

export default function orders(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_ORDERS:
    return { ...state, isLoading: true };
  case REQUEST_ORDERS_SUCCESS:
    return { ...state, isLoading: false, orders: action.orders };
  case REQUEST_ORDERS_FAIL:
    return { ...state, isLoading: false, error: action.error.message };
  default:
    return state;
  }
}

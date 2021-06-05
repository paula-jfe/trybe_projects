import {
  REQUEST_ADMIN_ORDER,
  REQUEST_ADMIN_ORDER_SUCCESS,
  REQUEST_ADMIN_ORDER_FAIL,
} from '../actions';

const INITIAL_STATE = {
  order: {},
  isLoading: false,
  error: '',
};

export default function adminOrder(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_ADMIN_ORDER:
    return { ...state, isLoading: true };
  case REQUEST_ADMIN_ORDER_SUCCESS:
    return { ...state, isLoading: false, orders: action.orders };
  case REQUEST_ADMIN_ORDER_FAIL:
    return { ...state, isLoading: false, error: action.error.message };
  default:
    return state;
  }
}

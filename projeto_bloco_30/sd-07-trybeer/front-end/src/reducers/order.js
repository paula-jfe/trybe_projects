import {
  SAVE_ORDER,
  REQUEST_ORDER,
  REQUEST_ORDER_SUCCESS,
  REQUEST_ORDER_FAIL,
} from '../actions';

const INITIAL_STATE = {
  status: '',
  order: [],
  isLoading: false,
  error: '',
};

export default function order(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_ORDER:
    return { ...state, status: action.message };
  case REQUEST_ORDER:
    return { ...state, isLoading: true };
  case REQUEST_ORDER_SUCCESS:
    return { ...state, isLoading: false, order: action.orders };
  case REQUEST_ORDER_FAIL:
    return { ...state, isLoading: false, error: action.error.message };
  default:
    return state;
  }
}

import {
  REQUEST_PRODUCTS,
  REQUEST_PRODUCTS_SUCCESS,
  REQUEST_PRODUCTS_FAIL,
} from '../actions';

const INITIAL_STATE = {
  products: [],
  isLoading: false,
  error: '',
};

export default function products(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_PRODUCTS:
    return { ...state, isLoading: true };
  case REQUEST_PRODUCTS_SUCCESS:
    return { ...state, isLoading: false, products: action.products };
  case REQUEST_PRODUCTS_FAIL:
    return { ...state, isLoading: false, error: action.error.message };
  default:
    return state;
  }
}

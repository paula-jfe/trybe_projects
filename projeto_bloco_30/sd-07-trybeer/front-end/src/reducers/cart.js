import {
  UPDATE_QUANTITY,
} from '../actions';

const INITIAL_STATE = {
  cart: [],
};

export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_QUANTITY:
    return { ...state, cart: action.cart };
  default:
    return state;
  }
}

import { REQUEST_CURRENCIES, REQUEST_CURRENCIES_SUCCESS, ADD_EXPENSE, ADD_EXPENSE_SUCCESS,
  /* REMOVE_EXPENSE */ } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

const receiveCurrencies = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case ADD_EXPENSE_SUCCESS:
    return { ...state,
      expenses: [...state.expenses, action.expenses],
      isFetching: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isFetching: true,
    };
  /* case REMOVE_EXPENSE:
    return {
      ...state,
      isFetching: true,
    }; */
  default:
    return state;
  }
};

export default receiveCurrencies;

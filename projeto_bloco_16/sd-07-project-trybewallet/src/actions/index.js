export const LOGIN = 'LOGIN';

export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const REQUEST_CURRENCIES_SUCCESS = 'REQUEST_CURRENCIES_SUCCESS';

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS';

export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const requestCurrenciesSuccess = (currencies) => ({
  type: REQUEST_CURRENCIES_SUCCESS,
  currencies: Object.keys(currencies),
});

/* const requestQuoteFail = () => ({
  type: REQUEST_QUOTE_FAIL,
}) */

export const requestAddExpenseValue = () => ({
  type: ADD_EXPENSE,
});

export const requestAddExpenseValueSuccess = (expenses, currentExpenses) => ({
  type: ADD_EXPENSE_SUCCESS,
  expenses: { ...currentExpenses, exchangeRates: expenses },
});

export const deleteExpenseFromExpenses = (expenses/* , id */) => ({
  type: REMOVE_EXPENSE,
  expenses,
});

export function fetchCurrencies(api) {
  return async (dispatch) => {
    dispatch(requestCurrencies());
    const currenciesObject = await api();
    delete currenciesObject.USDT;
    dispatch(requestCurrenciesSuccess(currenciesObject));
  };
}

export function fetchExpenses(api, currentExpenses) {
  return async (dispatch) => {
    dispatch(requestAddExpenseValue());
    const currenciesObject = await api();
    delete currenciesObject.USDT;
    dispatch(requestAddExpenseValueSuccess(currenciesObject, currentExpenses));
  };
}

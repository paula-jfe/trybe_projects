import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getCurrencies from '../services/awesomeAPI';
import { fetchCurrencies, fetchExpenses } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: 0,
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  async componentDidMount() {
    const { getAllCurrencies } = this.props;
    await getAllCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { getAllExpenses } = this.props;
    const { value, currency, method,
      tag, description } = this.state;
    let { id } = this.state;

    const currentExpenses = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };
    await getAllExpenses(currentExpenses);
    this.setState({ id: id += 1 });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method,
      tag, description } = this.state;

    const paymentMethod = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

    const expenseDestinationTag = ['Alimentação',
      'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <div>
        <input
          id="value"
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <select
          id="currency"
          name="currency"
          value={ currency }
          data-testid="currency-input"
          onChange={ (event) => this.handleChange(event) }
        >
          { currencies.map((code) => (
            <option
              key={ code }
              data-testid={ code }
            >
              { code }
            </option>
          ))}
        </select>
        <select
          id="method"
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ (event) => this.handleChange(event) }
        >
          { paymentMethod.map((expenseMethod) => (
            <option
              key={ expenseMethod }
              data-testid={ expenseMethod }
            >
              { expenseMethod }
            </option>
          ))}
        </select>
        <select
          id="tag"
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ (event) => this.handleChange(event) }
        >
          { expenseDestinationTag.map((expenseTag) => (
            <option
              key={ expenseTag }
              data-testid={ expenseTag }
            >
              { expenseTag }
            </option>
          ))}
        </select>
        <input
          id="description"
          name="description"
          type="text"
          value={ description }
          data-testid="description-input"
          onChange={ (event) => this.handleChange(event) }
        />
        <button
          id="addExpenseButton"
          type="button"
          onClick={ (event) => this.handleClick(event) }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(fetchCurrencies(getCurrencies)),
  getAllExpenses: (currentExpenses) => {
    dispatch(fetchExpenses(getCurrencies, currentExpenses));
  },
});

Form.propTypes = {
  getAllCurrencies: PropTypes.func.isRequired,
  getAllExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

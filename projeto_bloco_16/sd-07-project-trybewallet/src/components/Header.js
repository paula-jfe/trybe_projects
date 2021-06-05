import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;

    const newTotal = (expenses.map((expense) => {
      const { value, currency } = expense;
      const currencyQuote = expense.exchangeRates[currency].ask;
      return value * currencyQuote;
    }).reduce((acc, next) => acc + next, 0)).toFixed(2);

    return (
      <div>
        <div>
          <span>E-mail do usuário:</span>
          <h4 data-testid="email-field">{ email }</h4>
        </div>
        <div>
          <span>Valor total:</span>
          <h4 data-testid="total-field">{ newTotal }</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpenseFromExpenses } from '../actions';
import deleteImg from '../imgs/delete-sign.png';
import editImg from '../imgs/edit-sign.png';

class Table extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => {
              const { id, description, tag, method, value, currency } = expense;
              const currencyQuote = Number(expense.exchangeRates[currency].ask);
              const currencyName = expense.exchangeRates[currency].name;
              const convertedValue = (currencyQuote * value).toFixed(2);
              const convertionCurrency = 'Real';
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ value }</td>
                  <td>{ currencyName }</td>
                  <td>{ (currencyQuote).toFixed(2) }</td>
                  <td>{ convertedValue }</td>
                  <td>{ convertionCurrency }</td>
                  <td>
                    <button type="button">
                      <img
                        data-testid="edit-btn"
                        src={ editImg }
                        className="edit-icon"
                        alt="edit"
                        height="30px"
                      />
                    </button>
                    <button type="button">
                      <img
                        data-testid="delete-btn"
                        src={ deleteImg }
                        className="delete-icon"
                        alt="delete"
                        height="30px"
                      />
                    </button>
                  </td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (expenses, id) => dispatch(deleteExpenseFromExpenses(expenses, id)),
});

Table.propTypes = {
  expenses: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

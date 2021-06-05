import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../actions';

export default function Address({ handleEvent, status, saveOrder }) {
  const DELAY = 5000;
  const orderStatus = useSelector(({ order }) => order.status);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const dispatch = useDispatch();

  const isSuccess = () => {
    setTimeout(() => {
      setShouldRedirect('/products');
      dispatch(update([]));
    }, DELAY);
  };

  return (
    <>
      { shouldRedirect && <Redirect to={ shouldRedirect } />}
      <form onSubmit={ (event) => saveOrder(event) }>
        <label htmlFor="street">
          Rua
          <input
            id="street"
            name="street"
            data-testid="checkout-street-input"
            type="text"
            onChange={ (event) => handleEvent(event) }
          />
        </label>
        <label htmlFor="number">
          Número da casa
          <input
            id="number"
            name="number"
            data-testid="checkout-house-number-input"
            type="number"
            onChange={ (event) => handleEvent(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ status }
          data-testid="checkout-finish-btn"
        >
          Finalizar Pedido
        </button>
      </form>
      { orderStatus === 'success' && (<p>Compra realizada com sucesso!</p>) }
      { orderStatus === 'success' && isSuccess() }
      { orderStatus === 'fail' && (<p>Impossível realizar a compra</p>) }
    </>
  );
}

Address.propTypes = {
  handleEvent: PropTypes.objectOf.isRequired,
  status: PropTypes.bool.isRequired,
  saveOrder: PropTypes.func.isRequired,
};

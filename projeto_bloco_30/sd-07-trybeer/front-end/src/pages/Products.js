import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import '../styles/cart.css';
import { fetchProducts } from '../actions';

function Products() {
  const INITIAL_VALUE = 0;
  const [shouldRedirect, setShouldRedirect] = useState('');
  const productsList = useSelector(({ products }) => products);
  const cartStore = useSelector(({ cart }) => cart.cart);
  const user = JSON.parse(localStorage.getItem('user'));

  const totalValue = cartStore.map((item) => item.totalPrice)
    .reduce((acc, next) => acc + next, INITIAL_VALUE);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user || productsList.error) {
      setShouldRedirect('/login');
    } else {
      dispatch(fetchProducts(user.token));
    }
  }, []);

  return (
    <>
      <Header title="TryBeer" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { productsList.products
        .map((item, i) => <Card key={ i } product={ item } position={ i } />) }
      <div>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => setShouldRedirect('/checkout') }
          disabled={ cartStore.length === INITIAL_VALUE }
          className="cart-btn"
        >
          { 'Ver Carrinho ' }
          <span
            data-testid="checkout-bottom-btn-value"
          >
            { `${new Intl.NumberFormat('pt-br',
              { style: 'currency', currency: 'BRL' }).format(totalValue)}` }
          </span>
        </button>
      </div>
    </>
  );
}

export default Products;

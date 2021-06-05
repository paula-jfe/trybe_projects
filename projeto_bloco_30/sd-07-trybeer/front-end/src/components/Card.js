import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/card.css';
import { update } from '../actions';

export default function Card({ product, position }) {
  const INITIAL_VALUE = 0;
  const ADD_ITEM = 1;
  const REMOVE_ITEM = -1;
  const cartStore = useSelector(({ cart }) => cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(cartStore));
  }, [cartStore]);

  const manageQuantity = (productFound) => {
    if (productFound.quantity !== 0) {
      const filteredCart = cartStore.filter((item) => item.id !== productFound.id);
      const cartProducts = [...filteredCart, productFound];
      dispatch(update(cartProducts));
    } else {
      const filteredCart = cartStore.filter((item) => item.id !== productFound.id);
      dispatch(update(filteredCart));
    }
  };

  const verifyId = (id) => {
    const idIsPresent = cartStore.find((item) => item.id === id);
    if (idIsPresent) {
      const quantityFound = idIsPresent.quantity;
      return quantityFound;
    }
    return INITIAL_VALUE;
  };

  const getOldQuantity = (id) => {
    if (cartStore.length !== INITIAL_VALUE) {
      return verifyId(id);
    }
    return INITIAL_VALUE;
  };

  const getNewQuantity = (newProduct) => {
    const getProducts = JSON.parse(localStorage.getItem('products'));
    const productFound = getProducts.find((item) => item.id === newProduct.id);
    if (productFound) {
      manageQuantity(newProduct);
    } else {
      const newCart = [...getProducts, newProduct];
      // setRecoveredCart(newCart)
      // localStorage.setItem('products', JSON.stringify(newCart));
      dispatch(update(newCart));
    }
  };

  const manageNewProductInfo = (value, productSelected) => {
    const { id, name, price } = productSelected;
    const newProductInfo = {
      id,
      name,
      price: Number(price),
      quantity: 0,
      totalPrice: 0,
    };

    newProductInfo.quantity = getOldQuantity(productSelected.id) + value;
    newProductInfo.totalPrice = newProductInfo.quantity * price;
    getNewQuantity(newProductInfo);
  };

  const handleClick = (type, value, productSelected) => {
    if ((getOldQuantity(productSelected.id) !== 0 && type === 'remove')
      || type === 'add') {
      manageNewProductInfo(value, productSelected);
    }
  };

  return (
    <div className="card">
      <img
        data-testid={ `${position}-product-img` }
        src={ product.url_image }
        alt={ `Product ${product.name} ${position}` }
        height="50px"
      />
      <h4 data-testid={ `${position}-product-name` }>{ product.name }</h4>
      <span data-testid="0-product-price" />
      <span data-testid={ `${position}-product-price` }>
        { `${new Intl.NumberFormat('pt-br',
          { style: 'currency', currency: 'BRL' }).format(product.price)}` }
      </span>
      <div>
        <button
          type="button"
          data-testid={ `${position}-product-minus` }
          className="btn-cart"
          onClick={ () => handleClick('remove', REMOVE_ITEM, product) }
        >
          -
        </button>
        <p
          data-testid={ `${position}-product-qtd` }
          className="product-price"
        >
          { getOldQuantity(product.id) }
        </p>
        <button
          type="button"
          className="btn-cart"
          data-testid={ `${position}-product-plus` }
          onClick={ () => handleClick('add', ADD_ITEM, product) }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.number.isRequired,
};

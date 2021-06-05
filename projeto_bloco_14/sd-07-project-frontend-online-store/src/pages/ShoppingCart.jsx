import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.deleteproductsList = this.deleteproductsList.bind(this);
    this.increaseproductsList = this.increaseproductsList.bind(this);
    this.decreaseproductsList = this.decreaseproductsList.bind(this);
    this.state = {
      storage: JSON.parse(localStorage.getItem('productsList')),
    };
  }

  deleteproductsList({ target }) {
    const newArray = [];
    const id = target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((item) => item.id === id);
    products.forEach((item, index) => {
      if (findIndexInArray !== index) {
        newArray.push(item);
      }
    });
    localStorage.setItem('productsList', JSON.stringify(newArray));
    this.setState({
      storage: newArray,
    });
  }

  increaseproductsList({ target }) {
    const id = target.getAttribute('data-id');
    const availableQuantity = target.getAttribute('data-available-quantity');
    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((item) => item.id === id);
    const two = 2;
    let price = (
      (
        parseFloat(
          target.getAttribute('data-price'),
        ) / parseInt(target.getAttribute('data-quantity'), 10)
      )
    ).toFixed(two);

    if ((products[findIndexInArray].quantity) < availableQuantity) {
      products[findIndexInArray].quantity += 1;
      parseInt(price *= products[findIndexInArray].quantity, 10).toFixed(two);
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify(products));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    } else {
      target.disabled = true;
    }
  }

  decreaseproductsList({ target }) {
    const id = target.getAttribute('data-id');
    const products = JSON.parse(localStorage.getItem('productsList'));
    const findIndexInArray = products.findIndex((item) => item.id === id);
    const two = 2;
    let price = (
      (
        parseFloat(
          target.getAttribute('data-price'),
        ) / parseInt(target.getAttribute('data-quantity'), 10)
      )
    ).toFixed(two);
    if (products[findIndexInArray].quantity > 1) {
      products[findIndexInArray].quantity -= 1;
      price *= (products[findIndexInArray].quantity);
      products[findIndexInArray].price = price;
      localStorage.setItem('productsList', JSON.stringify(products));
      this.setState({
        storage: JSON.parse(localStorage.getItem('productsList')),
      });
    }
  }

  render() {
    const { storage } = this.state;
    const productsList = storage;
    const magicNumber = 0;
    const totalPrice = storage
      .map((product) => product.price)
      .reduce((acc, nextValue) => acc + nextValue, magicNumber);

    if (!productsList.length) {
      return (
        <div>
          <Link to="/">Voltar</Link>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      );
    }

    return (
      <div>
        <Link to="/">Voltar</Link>
        {
          productsList.map((product) => (
            <div key={ `${product.id}` }>
              <button
                data-id={ product.id }
                data-title={ product.title }
                data-thumbnail={ product.thumbnail }
                data-price={ product.price }
                data-quantity={ product.quantity }
                type="button"
                onClick={ this.deleteproductsList }
              >
                x
              </button>
              <img alt="Product" src={ product.thumbnail } />
              <p data-testid="shopping-cart-product-name">{ product.title }</p>
              <button
                data-id={ product.id }
                data-title={ product.title }
                data-thumbnail={ product.thumbnail }
                data-price={ product.price }
                data-quantity={ product.quantity }
                type="button"
                onClick={ this.decreaseproductsList }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">{ product.quantity }</p>
              <button
                data-id={ product.id }
                data-title={ product.title }
                data-thumbnail={ product.thumbnail }
                data-price={ product.price }
                data-quantity={ product.quantity }
                data-available-quantity={ product.availableQuantity }
                type="button"
                disabled={ false }
                onClick={ this.increaseproductsList }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <p>{ product.price }</p>
            </div>
          ))
        }
        <p>{ totalPrice }</p>
        <Link to="/checkout" data-testid="checkout-products">
          Finalizar a compra
        </Link>
        {/* <button type="submit">Finalizar a compra</button> */}
      </div>
    );
  }
}

export default ShoppingCart;

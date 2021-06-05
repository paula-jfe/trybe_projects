import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { number } from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { product, newStorageState2 } = this.props;
    const { category_id: categoryId } = product;
    const { available_quantity: availableQuantity } = product;
    const { id, title, thumbnail, price, shipping } = product;
    const { free_shipping: freeShipping } = shipping;

    return (
      <div>
        <Link
          to={ `product/${categoryId}/${id}` }
          className="link"
          data-testid="product-detail-link"
        >
          <div className="product-card" data-testid="product">
            <h4>{ title }</h4>
            { freeShipping ? <p data-testid="free-shipping">Frete Grátis</p> : null }
            <img alt="Product" src={ thumbnail } />
            <p>{ `R$ ${price}` }</p>
          </div>
        </Link>
        <button
          data-id={ id }
          data-title={ title }
          data-thumbnail={ thumbnail }
          data-price={ price }
          data-available-quantity={ availableQuantity }
          type="button"
          data-testid="product-add-to-cart"
          onClick={ (event) => newStorageState2(event) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.string,
    availableQuantity: number,
  }),
}.isRequired;

export default ProductCard;

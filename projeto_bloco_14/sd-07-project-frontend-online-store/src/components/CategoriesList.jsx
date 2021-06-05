import React from 'react';
import PropTypes from 'prop-types';

class CategoriesList extends React.Component {
  render() {
    const { categories, handleCategories } = this.props;

    return (
      <div className="categories-list">
        <p>Categorias</p>
        <ul>
          {
            categories.map((category) => (
              <li
                key={ category.id }
                data-id={ category.id }
                onClick={ handleCategories }
                role="presentation"
                className="category-item"
                data-testid="category"
              >
                { category.name }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array,
  handleCategories: PropTypes.func,
}.isRequired;

export default CategoriesList;

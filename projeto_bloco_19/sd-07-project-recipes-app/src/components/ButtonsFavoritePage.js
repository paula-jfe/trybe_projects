import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function ButtonsFavoritePage({ storage, handleClick }) {
  const [copyLink, setCopyLink] = useState(false);
  const [heartStatus, setHeartStatus] = useState('black');
  const [indexReceived, setIndexReceived] = useState('');
  const [recipeId, setRecipeId] = useState('');

  useEffect(() => {
    const { index, element } = storage;
    setIndexReceived(index);
    setRecipeId(element.id);
  }, [storage]);

  const handleShare = () => {
    const { element } = storage;
    const typeFound = element.type;
    if (typeFound === 'comida') {
      const path = window.location.host;
      const newPath = `http://${path}/comidas/${element.id}`;
      copy(newPath)
        .then(() => setCopyLink(true));
    } else {
      const path = window.location.host;
      const newPath = `http://${path}/bebidas/${element.id}`;
      copy(newPath)
        .then(() => setCopyLink(true));
    }
  };

  const handleAction = ({ target }) => {
    const { element } = storage;
    const idFound = target.getAttribute('data-id');
    if (heartStatus === 'white') {
      setHeartStatus('black');
      const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const myRecipes = [...getStatus, element];
      localStorage.setItem('favoriteRecipes', JSON.stringify(myRecipes));
    } else {
      setHeartStatus('white');
      const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const filterRecipes = getStatus.filter((recipe) => recipe.id !== element.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filterRecipes));
    }
    handleClick(idFound);
  };

  return (
    <div>
      <input
        data-type="share"
        data-testid={ `${indexReceived}-horizontal-share-btn` }
        type="image"
        alt="share-button"
        src={ shareIcon }
        onClick={ handleShare }
      />
      <input
        data-id={ recipeId }
        data-type="favorite"
        data-testid={ `${indexReceived}-horizontal-favorite-btn` }
        type="image"
        alt="favorite-button"
        src={ heartStatus === 'white' ? whiteHeartIcon : blackHeartIcon }
        onClick={ handleAction }
      />

      { copyLink === true ? (<span>Link copiado!</span>) : false }
    </div>
  );
}

ButtonsFavoritePage.propTypes = {
  storage: PropTypes.shape({
    element: PropTypes.objectOf(PropTypes.string).isRequired,
    index: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ButtonsFavoritePage;

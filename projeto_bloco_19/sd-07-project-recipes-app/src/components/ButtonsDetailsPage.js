import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import handleAction from '../functions/MountFavorite';

const copy = require('clipboard-copy');

function ButtonsDetailsPage({ api }) {
  const history = useHistory();
  const [copyLink, setCopyLink] = useState(false);
  const [heartStatus, setHeartStatus] = useState('');

  useEffect(() => {
    const getStatus = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!getStatus) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setHeartStatus('white');
    } else {
      const path = history.location.pathname;
      const position = 2;
      const numberToSplice = 1;
      const splitPath = path.split('/').splice(position, numberToSplice).toString();
      const returnId = getStatus.find((recipe) => recipe.id === splitPath);
      if (returnId) {
        setHeartStatus('black');
      } else {
        setHeartStatus('white');
      }
    }
  }, []);

  const handleShare = (entry) => {
    let alternative = '';
    if (entry === 'meal') {
      alternative = 'comidas';
    } else {
      alternative = 'bebidas';
    }
    const path = `${window.location.origin}/${alternative}/${api.recipeId}`;
    copy(path)
      .then(() => setCopyLink(true));
  };

  return (
    <div>
      <input
        data-type="share"
        data-testid="share-btn"
        type="image"
        alt="share-button"
        src={ shareIcon }
        onClick={ () => handleShare(api.key) }
      />
      <input
        data-type="favorite"
        data-testid="favorite-btn"
        type="image"
        alt="favorite-button"
        src={ heartStatus === 'white' ? whiteHeartIcon : blackHeartIcon }
        onClick={ () => setHeartStatus(handleAction(api, heartStatus)) }
      />
      { copyLink === true ? (<span>Link copiado!</span>) : false }
    </div>
  );
}

ButtonsDetailsPage.propTypes = {
  api: PropTypes.shape({
    key: PropTypes.string.isRequired,
    recipeId: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
  }).isRequired,
};

export default ButtonsDetailsPage;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { handleClickMeals } from '../functions/DetailPages';

function ButtonStart({ data }) {
  const history = useHistory();
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [buttonStatus, setButtonStatus] = useState('Iniciar Receita');

  useEffect(() => {
    const { recipeId } = data;
    const getDone = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const meals = getDone.map((recipe) => recipe.id);
    const findRecipe = meals.find((recipe) => recipe === recipeId);
    if (findRecipe) {
      setButtonVisibility(false);
    } else {
      setButtonVisibility(true);
    }
  }, [data]);

  useEffect(() => {
    const { recipeId, key } = data;
    let findRecipe = [];
    if (key === 'meal') {
      const getStarted = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { meals: {} };
      const recipesIds = Object.keys(getStarted.meals);
      findRecipe = recipesIds.find((element) => element === recipeId);
    } else if (key === 'cocktail') {
      const getStarted = JSON.parse(localStorage.getItem('inProgressRecipes'))
      || { cocktails: {} };
      const recipesIds = Object.keys(getStarted.cocktails);
      findRecipe = recipesIds.find((element) => element === recipeId);
    }
    if (findRecipe !== undefined) {
      setButtonStatus('Continuar Receita');
    }
  }, [data]);

  const handleClick = () => {
    const { recipeId, ingredMeasures, key } = data;
    if (key === 'meal') {
      history.push(`/comidas/${recipeId}/in-progress`);
    } else {
      history.push(`/bebidas/${recipeId}/in-progress`);
    }
    handleClickMeals(recipeId, ingredMeasures);
  };

  const showButton = () => (
    <button
      type="button"
      className="startRecipe"
      data-testid="start-recipe-btn"
      onClick={ handleClick }
    >
      { buttonStatus }
    </button>
  );

  return (
    <div>
      { buttonVisibility ? showButton() : null }
    </div>
  );
}

ButtonStart.propTypes = {
  data: PropTypes.shape({
    recipeId: PropTypes.string.isRequired,
    ingredMeasures: PropTypes.arrayOf(PropTypes.string).isRequired,
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default ButtonStart;

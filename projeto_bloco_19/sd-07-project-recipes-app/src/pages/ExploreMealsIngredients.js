import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import allActions from '../actions';
import { mealIngredients, mealByIngredient } from '../services/mealAPI';

function ExploreMealsIngredients() {
  const dispatch = useDispatch();
  const state = useSelector(({ mainpage }) => mainpage);
  const { isLoading, ingredients } = state;
  const history = useHistory();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Ingredientes'));
    dispatch(allActions.getIngredients(mealIngredients, true));
  }, [dispatch]);

  const handleClick = (ingredient) => {
    dispatch(allActions.saveIngredient(ingredient));
    dispatch(allActions.getMealsByIngredient(mealByIngredient, ingredient));
    history.push('/comidas');
  };

  const renderIngredients = (ingredient, index) => {
    const MAX_NUMBER = 12;
    if (index < MAX_NUMBER) {
      return (
        <button
          type="button"
          onClick={ () => handleClick(ingredient.strIngredient) }
          style={ { cursor: 'pointer' } }
          data-testid={ `${index}-ingredient-card` }
          key={ `card-${index}` }
        >
          <img
            key={ `ingredient-thumb-${index}` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt="ingredient thumb"
            data-testid={ `${index}-card-img` }
          />
          <h2
            key={ ingredient.strIngredient }
            data-testid={ `${index}-card-name` }
          >
            {ingredient.strIngredient}
          </h2>
        </button>
      );
    }
    return null;
  };

  if (isLoading) {
    return (<h1>Loading...</h1>);
  }
  return (
    <div>
      <Header />
      {ingredients.map((ingredient, index) => renderIngredients(ingredient, index))}
      <Footer />
    </div>
  );
}

export default ExploreMealsIngredients;

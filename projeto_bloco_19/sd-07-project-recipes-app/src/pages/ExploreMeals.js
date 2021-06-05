import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FlexContainer from '../components/FlexContainer';
import ButtonMedium from '../components/ButtonMedium';
import { randomMeal } from '../services/mealAPI';
import allActions from '../actions';

function ExploreMeals() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.changePageTitle('Explorar Comidas'));
  }, [dispatch]);

  const history = useHistory();

  function handleClick(e, url) {
    e.preventDefault();
    history.push(`/explorar/comidas/${url}`);
  }

  function surpriseMe(e) {
    e.preventDefault();
    randomMeal()
      .then((response) => history.push(`/comidas/${response.meals[0].idMeal}`));
  }

  return (
    <div>
      <Header />
      <FlexContainer>
        <ButtonMedium
          data-testid="explore-by-ingredient"
          onClick={ (e) => handleClick(e, 'ingredientes') }
        >
          Por Ingredientes
        </ButtonMedium>
        <ButtonMedium
          data-testid="explore-by-area"
          onClick={ (e) => handleClick(e, 'area') }
        >
          Por Local de Origem
        </ButtonMedium>
        <ButtonMedium
          data-testid="explore-surprise"
          onClick={ (e) => surpriseMe(e) }
        >
          Me Surpreenda!
        </ButtonMedium>
      </FlexContainer>
      <Footer />
    </div>
  );
}

export default ExploreMeals;
